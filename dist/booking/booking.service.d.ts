import { Repository, Connection } from 'typeorm';
import { Booking } from './entities/booking.entity';
import { Flight } from '../flight/entities/flight.entity';
import { Passenger } from '../passenger/entities/passenger.entity';
import { NotificationQueueService } from '../queue/notification-queue.service';
export declare class BookingService {
    private bookingRepository;
    private flightRepository;
    private passengerRepository;
    private connection;
    private notificationQueueService;
    constructor(bookingRepository: Repository<Booking>, flightRepository: Repository<Flight>, passengerRepository: Repository<Passenger>, connection: Connection, notificationQueueService: NotificationQueueService);
    bookFlight(userId: string, flightId: string, seatNumber: string): Promise<Booking>;
    findPassengerBookings(userId: string): Promise<Booking[]>;
    findFlightBookings(flightId: string): Promise<Booking[]>;
    findOne(id: string): Promise<Booking>;
}
