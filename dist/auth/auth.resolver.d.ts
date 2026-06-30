import { AuthService } from './auth.service';
import { RegisterPassengerInput } from './dto/register-passenger.input';
import { LoginInput } from './dto/login.input';
import { AuthResponse } from './dto/auth-response.type';
import { User } from './entities/user.entity';
export declare class AuthResolver {
    private authService;
    constructor(authService: AuthService);
    registerPassenger(input: RegisterPassengerInput): Promise<AuthResponse>;
    login(input: LoginInput): Promise<AuthResponse>;
    createAdminForDemo(email: string, password: string): Promise<User>;
}
