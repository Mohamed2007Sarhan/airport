import { Repository, Connection } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { User } from './entities/user.entity';
import { RegisterPassengerInput } from './dto/register-passenger.input';
import { LoginInput } from './dto/login.input';
import { AuthResponse } from './dto/auth-response.type';
export declare class AuthService {
    private userRepository;
    private connection;
    private jwtService;
    constructor(userRepository: Repository<User>, connection: Connection, jwtService: JwtService);
    registerPassenger(input: RegisterPassengerInput): Promise<AuthResponse>;
    login(input: LoginInput): Promise<AuthResponse>;
    createAdmin(email: string, password: string): Promise<User>;
    private generateToken;
}
