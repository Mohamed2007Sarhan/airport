import { Passenger } from '../../passenger/entities/passenger.entity';
import { Flight } from '../../flight/entities/flight.entity';
export declare class Booking {
    id: string;
    passenger: Passenger;
    passengerId: string;
    flight: Flight;
    flightId: string;
    seatNumber: string;
    bookingDate: Date;
}
