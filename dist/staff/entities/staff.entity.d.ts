import { User } from '../../auth/entities/user.entity';
import { Flight } from '../../flight/entities/flight.entity';
export declare enum StaffRole {
    PILOT = "PILOT",
    CREW = "CREW",
    GROUND_STAFF = "GROUND_STAFF",
    SECURITY = "SECURITY"
}
export declare class Staff {
    id: string;
    user: User;
    userId: string;
    name: string;
    employeeId: string;
    role: StaffRole;
    assignedFlight?: Flight;
    assignedFlightId?: string;
}
