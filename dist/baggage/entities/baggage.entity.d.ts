import { Passenger } from '../../passenger/entities/passenger.entity';
import { Flight } from '../../flight/entities/flight.entity';
export declare enum BaggageStatus {
    CHECKED_IN = "CHECKED_IN",
    IN_TRANSIT = "IN_TRANSIT",
    ARRIVED = "ARRIVED",
    CLAIMED = "CLAIMED"
}
export declare class Baggage {
    id: string;
    passenger: Passenger;
    passengerId: string;
    flight: Flight;
    flightId: string;
    tagNumber: string;
    weight: number;
    status: BaggageStatus;
}
