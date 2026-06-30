import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { NotificationQueueService } from './notification-queue.service';

@Module({
  imports: [ConfigModule],
  providers: [NotificationQueueService],
  exports: [NotificationQueueService],
})
export class QueueModule {}
