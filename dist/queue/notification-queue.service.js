"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var NotificationQueueService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotificationQueueService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const bullmq_1 = require("bullmq");
let NotificationQueueService = NotificationQueueService_1 = class NotificationQueueService {
    constructor(configService) {
        this.configService = configService;
        this.logger = new common_1.Logger(NotificationQueueService_1.name);
    }
    onModuleInit() {
        const host = this.configService.get('REDIS_HOST', 'localhost');
        const port = this.configService.get('REDIS_PORT', 6379);
        try {
            this.queue = new bullmq_1.Queue('notifications', {
                connection: { host, port },
            });
            this.logger.log(`BullMQ initialized on Redis ${host}:${port}`);
            this.worker = new bullmq_1.Worker('notifications', async (job) => {
                this.logger.log(`[Worker] Job ${job.id} starting`);
                const { email, message, type } = job.data;
                await new Promise((resolve) => setTimeout(resolve, 1000));
                this.logger.log(`\n--------------------------------------------------\n` +
                    `[ALERT SENT] \n` +
                    `Type: ${type}\n` +
                    `To: ${email}\n` +
                    `Message: "${message}"\n` +
                    `--------------------------------------------------`);
                return { sent: true, recipient: email };
            }, {
                connection: { host, port },
            });
            this.worker.on('completed', (job) => {
                this.logger.log(`[Worker] Job ${job.id} completed`);
            });
            this.worker.on('failed', (job, err) => {
                this.logger.error(`[Worker] Job ${job === null || job === void 0 ? void 0 : job.id} failed: ${err.message}`);
            });
        }
        catch (error) {
            this.logger.error(`Failed to initialize BullMQ: ${error.message}`);
        }
    }
    async addBookingConfirmation(email, passengerName, flightNumber, seatNumber) {
        if (!this.queue)
            return;
        await this.queue.add('bookingConfirmation', {
            email,
            type: 'BOOKING_CONFIRMATION',
            message: `Dear ${passengerName}, your booking on Flight ${flightNumber} (Seat: ${seatNumber}) is confirmed.`,
        });
    }
    async addFlightStatusAlert(email, passengerName, flightNumber, newStatus) {
        if (!this.queue)
            return;
        await this.queue.add('flightStatusAlert', {
            email,
            type: 'FLIGHT_STATUS_ALERT',
            message: `Flight ${flightNumber} status updated to ${newStatus}.`,
        });
    }
    async onModuleDestroy() {
        if (this.queue)
            await this.queue.close();
        if (this.worker)
            await this.worker.close();
    }
};
NotificationQueueService = NotificationQueueService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], NotificationQueueService);
exports.NotificationQueueService = NotificationQueueService;
//# sourceMappingURL=notification-queue.service.js.map