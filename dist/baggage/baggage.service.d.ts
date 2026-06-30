import { Repository } from 'typeorm';
import { Baggage } from './entities/baggage.entity';
import { RegisterBaggageInput } from './dto/register-baggage.input';
import { UpdateBaggageStatusInput } from './dto/update-baggage-status.input';
import { Passenger } from '../passenger/entities/passenger.entity';
import { Flight } from '../flight/entities/flight.entity';
export declare class BaggageService {
    private baggageRepository;
    private passengerRepository;
    private flightRepository;
    constructor(baggageRepository: Repository<Baggage>, passengerRepository: Repository<Passenger>, flightRepository: Repository<Flight>);
    register(input: RegisterBaggageInput): Promise<Baggage>;
    updateStatus(input: UpdateBaggageStatusInput): Promise<Baggage>;
    findByPassenger(passengerId: string): Promise<Baggage[]>;
    findByUserId(userId: string): Promise<Baggage[]>;
    findAll(): Promise<Baggage[]>;
    findOne(id: string): Promise<Baggage>;
}
