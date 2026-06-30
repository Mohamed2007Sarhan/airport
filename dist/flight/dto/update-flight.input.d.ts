import { FlightStatus } from '../entities/flight.entity';
export declare class UpdateFlightInput {
    id: string;
    flightNumber?: string;
    departureAirportId?: string;
    destinationAirportId?: string;
    departureTime?: Date;
    arrivalTime?: Date;
    airline?: string;
    availableSeats?: number;
    status?: FlightStatus;
}
