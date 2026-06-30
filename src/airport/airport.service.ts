import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Airport } from './entities/airport.entity';
import { CreateAirportInput } from './dto/create-airport.input';
import { UpdateAirportInput } from './dto/update-airport.input';

@Injectable()
export class AirportService {
  constructor(
    @InjectRepository(Airport)
    private airportRepository: Repository<Airport>,
  ) {}

  async create(input: CreateAirportInput): Promise<Airport> {
    const code = input.code.toUpperCase();
    const existing = await this.airportRepository.findOne({ where: { code } });
    if (existing) {
      throw new ConflictException(`Airport with code ${code} already exists`);
    }

    const airport = this.airportRepository.create({
      ...input,
      code,
    });
    return this.airportRepository.save(airport);
  }

  async findAll(): Promise<Airport[]> {
    return this.airportRepository.find();
  }

  async findOne(id: string): Promise<Airport> {
    const airport = await this.airportRepository.findOne({ where: { id } });
    if (!airport) {
      throw new NotFoundException(`Airport with ID ${id} not found`);
    }
    return airport;
  }

  async update(input: UpdateAirportInput): Promise<Airport> {
    const { id, ...data } = input;
    const airport = await this.findOne(id);

    if (data.code) {
      data.code = data.code.toUpperCase();
      if (data.code !== airport.code) {
        const existing = await this.airportRepository.findOne({ where: { code: data.code } });
        if (existing) {
          throw new ConflictException(`Airport with code ${data.code} already exists`);
        }
      }
    }

    Object.assign(airport, data);
    return this.airportRepository.save(airport);
  }

  async remove(id: string): Promise<boolean> {
    const airport = await this.findOne(id);
    await this.airportRepository.remove(airport);
    return true;
  }
}
