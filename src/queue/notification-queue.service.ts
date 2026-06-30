import { Injectable, OnModuleInit, OnModuleDestroy, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Queue, Worker } from 'bullmq';

@Injectable()
export class NotificationQueueService implements OnModuleInit, OnModuleDestroy {
  private readonly logger = new Logger(NotificationQueueService.name);
  private queue: Queue;
  private worker: Worker;

  constructor(private configService: ConfigService) {}

  onModuleInit() {
    const host = this.configService.get<string>('REDIS_HOST', 'localhost');
    const port = this.configService.get<number>('REDIS_PORT', 6379);

    try {
      this.queue = new Queue('notifications', {
        connection: { host, port },
      });

      this.logger.log(`BullMQ initialized on Redis ${host}:${port}`);

      this.worker = new Worker(
        'notifications',
        async (job) => {
          this.logger.log(`[Worker] Job ${job.id} starting`);
          const { email, message, type } = job.data;
          
          await new Promise((resolve) => setTimeout(resolve, 1000));
          
          this.logger.log(
            `\n--------------------------------------------------\n` +
            `[ALERT SENT] \n` +
            `Type: ${type}\n` +
            `To: ${email}\n` +
            `Message: "${message}"\n` +
            `--------------------------------------------------`
          );
          
          return { sent: true, recipient: email };
        },
        {
          connection: { host, port },
        },
      );

      this.worker.on('completed', (job) => {
        this.logger.log(`[Worker] Job ${job.id} completed`);
      });

      this.worker.on('failed', (job, err) => {
        this.logger.error(`[Worker] Job ${job?.id} failed: ${err.message}`);
      });
    } catch (error) {
      this.logger.error(`Failed to initialize BullMQ: ${error.message}`);
    }
  }

  async addBookingConfirmation(
    email: string,
    passengerName: string,
    flightNumber: string,
    seatNumber: string,
  ): Promise<void> {
    if (!this.queue) return;
    await this.queue.add('bookingConfirmation', {
      email,
      type: 'BOOKING_CONFIRMATION',
      message: `Dear ${passengerName}, your booking on Flight ${flightNumber} (Seat: ${seatNumber}) is confirmed.`,
    });
  }

  async addFlightStatusAlert(
    email: string,
    passengerName: string,
    flightNumber: string,
    newStatus: string,
  ): Promise<void> {
    if (!this.queue) return;
    await this.queue.add('flightStatusAlert', {
      email,
      type: 'FLIGHT_STATUS_ALERT',
      message: `Flight ${flightNumber} status updated to ${newStatus}.`,
    });
  }

  async onModuleDestroy() {
    if (this.queue) await this.queue.close();
    if (this.worker) await this.worker.close();
  }
}
