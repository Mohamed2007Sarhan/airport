import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { RegisterPassengerInput } from './dto/register-passenger.input';
import { LoginInput } from './dto/login.input';
import { AuthResponse } from './dto/auth-response.type';
import { User } from './entities/user.entity';

@Resolver()
export class AuthResolver {
  constructor(private authService: AuthService) {}

  @Mutation(() => AuthResponse)
  async registerPassenger(
    @Args('input') input: RegisterPassengerInput,
  ): Promise<AuthResponse> {
    return this.authService.registerPassenger(input);
  }

  @Mutation(() => AuthResponse)
  async login(
    @Args('input') input: LoginInput,
  ): Promise<AuthResponse> {
    return this.authService.login(input);
  }

  // Demo helper to quickly register an admin without constraints
  @Mutation(() => User)
  async createAdminForDemo(
    @Args('email') email: string,
    @Args('password') password: string,
  ): Promise<User> {
    return this.authService.createAdmin(email, password);
  }
}
