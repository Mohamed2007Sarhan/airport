export declare enum UserRole {
    ADMIN = "ADMIN",
    STAFF = "STAFF",
    PASSENGER = "PASSENGER"
}
export declare class User {
    id: string;
    email: string;
    password: string;
    role: UserRole;
    createdAt: Date;
}
