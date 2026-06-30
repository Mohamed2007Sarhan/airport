import { Repository } from 'typeorm';
import { Flight, FlightStatus } from './entities/flight.entity';
import { Airport } from '../airport/entities/airport.entity';
import { Booking } from '../booking/entities/booking.entity';
import { CreateFlightInput } from './dto/create-flight.input';
import { UpdateFlightInput } from './dto/update-flight.input';
import { FlightFilterInput } from './dto/flight-filter.input';
import { FlightsResponse } from './dto/flights-response.type';
import { NotificationQueueService } from '../queue/notification-queue.service';
export declare class FlightService {
    private flightRepository;
    private airportRepository;
    private bookingRepository;
    private notificationQueueService;
    constructor(flightRepository: Repository<Flight>, airportRepository: Repository<Airport>, bookingRepository: Repository<Booking>, notificationQueueService: NotificationQueueService);
    create(input: CreateFlightInput): Promise<Flight>;
    findAll(limit?: number, offset?: number, filter?: FlightFilterInput): Promise<FlightsResponse>;
    findOne(id: string): Promise<Flight>;
    update(input: UpdateFlightInput): Promise<Flight>;
    updateStatus(id: string, status: FlightStatus): Promise<Flight>;
    remove(id: string): Promise<boolean>;
}
