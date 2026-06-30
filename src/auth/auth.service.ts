import { Injectable, ConflictException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Connection } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { User, UserRole } from './entities/user.entity';
import { Passenger } from '../passenger/entities/passenger.entity';
import { RegisterPassengerInput } from './dto/register-passenger.input';
import { LoginInput } from './dto/login.input';
import { AuthResponse } from './dto/auth-response.type';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private connection: Connection,
    private jwtService: JwtService,
  ) {}

  async registerPassenger(input: RegisterPassengerInput): Promise<AuthResponse> {
    const { email, password, name, passportNumber, nationality } = input;

    const existingUser = await this.userRepository.findOne({ where: { email } });
    if (existingUser) {
      throw new ConflictException('Email address already registered');
    }

    const passwordHash = await bcrypt.hash(password, 10);

    // Run passenger creation inside transaction to ensure atomicity
    return this.connection.transaction(async (entityManager) => {
      const user = new User();
      user.email = email;
      user.password = passwordHash;
      user.role = UserRole.PASSENGER;
      const savedUser = await entityManager.save(user);

      const existingPassenger = await entityManager.findOne(Passenger, { where: { passportNumber } });
      if (existingPassenger) {
        throw new ConflictException('Passport number already registered');
      }

      const passenger = new Passenger();
      passenger.userId = savedUser.id;
      passenger.name = name;
      passenger.passportNumber = passportNumber;
      passenger.nationality = nationality;
      await entityManager.save(passenger);

      const token = this.generateToken(savedUser);

      return {
        token,
        user: savedUser,
      };
    });
  }

  async login(input: LoginInput): Promise<AuthResponse> {
    const { email, password } = input;

    const user = await this.userRepository.findOne({ where: { email } });
    if (!user) {
      throw new UnauthorizedException('Invalid email or password');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid email or password');
    }

    const token = this.generateToken(user);

    return {
      token,
      user,
    };
  }

  async createAdmin(email: string, password: string): Promise<User> {
    const existing = await this.userRepository.findOne({ where: { email } });
    if (existing) {
      return existing;
    }
    const user = new User();
    user.email = email;
    user.password = await bcrypt.hash(password, 10);
    user.role = UserRole.ADMIN;
    return this.userRepository.save(user);
  }

  private generateToken(user: User): string {
    const payload = { email: user.email, sub: user.id, role: user.role };
    return this.jwtService.sign(payload);
  }
}
