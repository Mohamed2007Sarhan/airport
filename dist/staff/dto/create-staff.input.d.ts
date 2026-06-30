import { StaffRole } from '../entities/staff.entity';
export declare class CreateStaffInput {
    email: string;
    password: string;
    name: string;
    employeeId: string;
    role: StaffRole;
}
