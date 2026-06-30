import { BaggageService } from './baggage.service';
import { Baggage } from './entities/baggage.entity';
import { RegisterBaggageInput } from './dto/register-baggage.input';
import { UpdateBaggageStatusInput } from './dto/update-baggage-status.input';
import { Passenger } from '../passenger/entities/passenger.entity';
import { Flight } from '../flight/entities/flight.entity';
import { PassengerService } from '../passenger/passenger.service';
import { FlightService } from '../flight/flight.service';
import { User } from '../auth/entities/user.entity';
export declare class BaggageResolver {
    private readonly baggageService;
    private readonly passengerService;
    private readonly flightService;
    constructor(baggageService: BaggageService, passengerService: PassengerService, flightService: FlightService);
    registerBaggage(input: RegisterBaggageInput): Promise<Baggage>;
    updateBaggageStatus(input: UpdateBaggageStatusInput): Promise<Baggage>;
    findAll(): Promise<Baggage[]>;
    myBaggage(user: User): Promise<Baggage[]>;
    findOne(user: User, id: string): Promise<Baggage>;
    passenger(baggage: Baggage): Promise<Passenger>;
    flight(baggage: Baggage): Promise<Flight>;
}
