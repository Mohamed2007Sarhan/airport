import { OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
export declare class NotificationQueueService implements OnModuleInit, OnModuleDestroy {
    private configService;
    private readonly logger;
    private queue;
    private worker;
    constructor(configService: ConfigService);
    onModuleInit(): void;
    addBookingConfirmation(email: string, passengerName: string, flightNumber: string, seatNumber: string): Promise<void>;
    addFlightStatusAlert(email: string, passengerName: string, flightNumber: string, newStatus: string): Promise<void>;
    onModuleDestroy(): Promise<void>;
}
