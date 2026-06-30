import { BookingService } from './booking.service';
import { Booking } from './entities/booking.entity';
import { Passenger } from '../passenger/entities/passenger.entity';
import { Flight } from '../flight/entities/flight.entity';
import { PassengerService } from '../passenger/passenger.service';
import { FlightService } from '../flight/flight.service';
import { User } from '../auth/entities/user.entity';
export declare class BookingResolver {
    private readonly bookingService;
    private readonly passengerService;
    private readonly flightService;
    constructor(bookingService: BookingService, passengerService: PassengerService, flightService: FlightService);
    bookFlight(user: User, flightId: string, seatNumber: string): Promise<Booking>;
    myBookings(user: User): Promise<Booking[]>;
    flightBookings(flightId: string): Promise<Booking[]>;
    findOne(user: User, id: string): Promise<Booking>;
    passenger(booking: Booking): Promise<Passenger>;
    flight(booking: Booking): Promise<Flight>;
}
