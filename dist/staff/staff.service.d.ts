import { Repository, Connection } from 'typeorm';
import { Staff } from './entities/staff.entity';
import { User } from '../auth/entities/user.entity';
import { Flight } from '../flight/entities/flight.entity';
import { CreateStaffInput } from './dto/create-staff.input';
export declare class StaffService {
    private staffRepository;
    private userRepository;
    private flightRepository;
    private connection;
    constructor(staffRepository: Repository<Staff>, userRepository: Repository<User>, flightRepository: Repository<Flight>, connection: Connection);
    create(input: CreateStaffInput): Promise<Staff>;
    assignToFlight(staffId: string, flightId: string | null): Promise<Staff>;
    findAll(): Promise<Staff[]>;
    findOne(id: string): Promise<Staff>;
    findByUserId(userId: string): Promise<Staff>;
    remove(id: string): Promise<boolean>;
}
