import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Baggage, BaggageStatus } from './entities/baggage.entity';
import { RegisterBaggageInput } from './dto/register-baggage.input';
import { UpdateBaggageStatusInput } from './dto/update-baggage-status.input';
import { Passenger } from '../passenger/entities/passenger.entity';
import { Flight } from '../flight/entities/flight.entity';

@Injectable()
export class BaggageService {
  constructor(
    @InjectRepository(Baggage)
    private baggageRepository: Repository<Baggage>,
    @InjectRepository(Passenger)
    private passengerRepository: Repository<Passenger>,
    @InjectRepository(Flight)
    private flightRepository: Repository<Flight>,
  ) {}

  async register(input: RegisterBaggageInput): Promise<Baggage> {
    const { passengerId, flightId, tagNumber, weight } = input;

    // Check if passenger exists
    const passenger = await this.passengerRepository.findOne({ where: { id: passengerId } });
    if (!passenger) {
      throw new NotFoundException(`Passenger with ID ${passengerId} not found`);
    }

    // Check if flight exists
    const flight = await this.flightRepository.findOne({ where: { id: flightId } });
    if (!flight) {
      throw new NotFoundException(`Flight with ID ${flightId} not found`);
    }

    // Check if tag number already registered
    const existing = await this.baggageRepository.findOne({ where: { tagNumber } });
    if (existing) {
      throw new ConflictException(`Baggage with tag number ${tagNumber} is already registered`);
    }

    const baggage = this.baggageRepository.create(input);
    return this.baggageRepository.save(baggage);
  }

  async updateStatus(input: UpdateBaggageStatusInput): Promise<Baggage> {
    const { id, status } = input;
    const baggage = await this.findOne(id);
    baggage.status = status;
    return this.baggageRepository.save(baggage);
  }

  async findByPassenger(passengerId: string): Promise<Baggage[]> {
    return this.baggageRepository.find({
      where: { passengerId },
      relations: ['flight'],
    });
  }

  async findByUserId(userId: string): Promise<Baggage[]> {
    const passenger = await this.passengerRepository.findOne({ where: { userId } });
    if (!passenger) {
      throw new NotFoundException('Passenger profile not found');
    }
    return this.findByPassenger(passenger.id);
  }

  async findAll(): Promise<Baggage[]> {
    return this.baggageRepository.find({ relations: ['passenger', 'flight'] });
  }

  async findOne(id: string): Promise<Baggage> {
    const baggage = await this.baggageRepository.findOne({
      where: { id },
      relations: ['passenger', 'flight'],
    });
    if (!baggage) {
      throw new NotFoundException(`Baggage with ID ${id} not found`);
    }
    return baggage;
  }
}
