import { PubSub } from 'graphql-subscriptions';
import { FlightService } from './flight.service';
import { Flight, FlightStatus } from './entities/flight.entity';
import { Airport } from '../airport/entities/airport.entity';
import { AirportLoader } from '../airport/airport.loader';
import { CreateFlightInput } from './dto/create-flight.input';
import { UpdateFlightInput } from './dto/update-flight.input';
import { FlightFilterInput } from './dto/flight-filter.input';
import { FlightsResponse } from './dto/flights-response.type';
export declare const pubSub: PubSub;
export declare class FlightResolver {
    private readonly flightService;
    private readonly airportLoader;
    constructor(flightService: FlightService, airportLoader: AirportLoader);
    createFlight(input: CreateFlightInput): Promise<Flight>;
    findAll(limit: number, offset: number, filter?: FlightFilterInput): Promise<FlightsResponse>;
    findOne(id: string): Promise<Flight>;
    updateFlight(input: UpdateFlightInput): Promise<Flight>;
    updateFlightStatus(id: string, status: FlightStatus): Promise<Flight>;
    removeFlight(id: string): Promise<boolean>;
    departureAirport(flight: Flight): Promise<Airport>;
    destinationAirport(flight: Flight): Promise<Airport>;
}
