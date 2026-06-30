import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Connection } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Staff } from './entities/staff.entity';
import { User, UserRole } from '../auth/entities/user.entity';
import { Flight } from '../flight/entities/flight.entity';
import { CreateStaffInput } from './dto/create-staff.input';

@Injectable()
export class StaffService {
  constructor(
    @InjectRepository(Staff)
    private staffRepository: Repository<Staff>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Flight)
    private flightRepository: Repository<Flight>,
    private connection: Connection,
  ) {}

  async create(input: CreateStaffInput): Promise<Staff> {
    const { email, password, name, employeeId, role } = input;

    // Check if email already exists
    const existingUser = await this.userRepository.findOne({ where: { email } });
    if (existingUser) {
      throw new ConflictException('Email address already registered');
    }

    const passwordHash = await bcrypt.hash(password, 10);

    return this.connection.transaction(async (entityManager) => {
      // 1. Create User
      const user = new User();
      user.email = email;
      user.password = passwordHash;
      user.role = UserRole.STAFF;
      const savedUser = await entityManager.save(user);

      // Check if employeeId already exists
      const existingStaff = await entityManager.findOne(Staff, { where: { employeeId } });
      if (existingStaff) {
        throw new ConflictException('Employee ID already registered');
      }

      // 2. Create Staff
      const staff = new Staff();
      staff.userId = savedUser.id;
      staff.name = name;
      staff.employeeId = employeeId;
      staff.role = role;
      
      return entityManager.save(staff);
    });
  }

  async assignToFlight(staffId: string, flightId: string | null): Promise<Staff> {
    const staff = await this.staffRepository.findOne({ where: { id: staffId } });
    if (!staff) {
      throw new NotFoundException(`Staff member with ID ${staffId} not found`);
    }

    if (flightId) {
      const flight = await this.flightRepository.findOne({ where: { id: flightId } });
      if (!flight) {
        throw new NotFoundException(`Flight with ID ${flightId} not found`);
      }
      staff.assignedFlightId = flightId;
    } else {
      staff.assignedFlightId = null;
    }

    return this.staffRepository.save(staff);
  }

  async findAll(): Promise<Staff[]> {
    return this.staffRepository.find({ relations: ['user', 'assignedFlight'] });
  }

  async findOne(id: string): Promise<Staff> {
    const staff = await this.staffRepository.findOne({
      where: { id },
      relations: ['user', 'assignedFlight'],
    });
    if (!staff) {
      throw new NotFoundException(`Staff member with ID ${id} not found`);
    }
    return staff;
  }

  async findByUserId(userId: string): Promise<Staff> {
    const staff = await this.staffRepository.findOne({
      where: { userId },
      relations: ['assignedFlight'],
    });
    if (!staff) {
      throw new NotFoundException(`Staff profile not found for user ID ${userId}`);
    }
    return staff;
  }

  async remove(id: string): Promise<boolean> {
    const staff = await this.findOne(id);
    
    return this.connection.transaction(async (entityManager) => {
      await entityManager.remove(staff);
      // Delete user account as well
      const user = await entityManager.findOne(User, { where: { id: staff.userId } });
      if (user) {
        await entityManager.remove(user);
      }
      return true;
    });
  }
}
