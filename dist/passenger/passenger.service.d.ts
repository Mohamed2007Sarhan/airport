import { Repository } from 'typeorm';
import { Passenger } from './entities/passenger.entity';
export declare class PassengerService {
    private passengerRepository;
    constructor(passengerRepository: Repository<Passenger>);
    findByUserId(userId: string): Promise<Passenger>;
    findAll(): Promise<Passenger[]>;
    findOne(id: string): Promise<Passenger>;
}
