import { PassengerService } from './passenger.service';
import { Passenger } from './entities/passenger.entity';
import { User } from '../auth/entities/user.entity';
export declare class PassengerResolver {
    private readonly passengerService;
    constructor(passengerService: PassengerService);
    getProfile(user: User): Promise<Passenger>;
    findAll(): Promise<Passenger[]>;
    findOne(id: string): Promise<Passenger>;
}
