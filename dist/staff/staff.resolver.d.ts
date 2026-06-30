import { StaffService } from './staff.service';
import { Staff } from './entities/staff.entity';
import { CreateStaffInput } from './dto/create-staff.input';
import { User } from '../auth/entities/user.entity';
export declare class StaffResolver {
    private readonly staffService;
    constructor(staffService: StaffService);
    createStaff(input: CreateStaffInput): Promise<Staff>;
    assignStaffToFlight(staffId: string, flightId?: string): Promise<Staff>;
    findAll(): Promise<Staff[]>;
    findOne(id: string): Promise<Staff>;
    getProfile(user: User): Promise<Staff>;
    removeStaff(id: string): Promise<boolean>;
}
