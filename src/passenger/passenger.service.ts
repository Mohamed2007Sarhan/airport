import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Passenger } from './entities/passenger.entity';

@Injectable()
export class PassengerService {
  constructor(
    @InjectRepository(Passenger)
    private passengerRepository: Repository<Passenger>,
  ) {}

  async findByUserId(userId: string): Promise<Passenger> {
    const passenger = await this.passengerRepository.findOne({ where: { userId } });
    if (!passenger) {
      throw new NotFoundException(`Passenger profile not found for user ID ${userId}`);
    }
    return passenger;
  }

  async findAll(): Promise<Passenger[]> {
    return this.passengerRepository.find({ relations: ['user'] });
  }

  async findOne(id: string): Promise<Passenger> {
    const passenger = await this.passengerRepository.findOne({
      where: { id },
      relations: ['user'],
    });
    if (!passenger) {
      throw new NotFoundException(`Passenger with ID ${id} not found`);
    }
    return passenger;
  }
}
