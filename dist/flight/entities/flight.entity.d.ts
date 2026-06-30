import { Airport } from '../../airport/entities/airport.entity';
export declare enum FlightStatus {
    ON_TIME = "ON_TIME",
    DELAYED = "DELAYED",
    CANCELED = "CANCELED"
}
export declare class Flight {
    id: string;
    flightNumber: string;
    departureAirport: Airport;
    departureAirportId: string;
    destinationAirport: Airport;
    destinationAirportId: string;
    departureTime: Date;
    arrivalTime: Date;
    airline: string;
    availableSeats: number;
    status: FlightStatus;
}
