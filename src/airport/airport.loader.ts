import { Injectable, Scope } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as DataLoader from 'dataloader';
import { Airport } from './entities/airport.entity';

@Injectable({ scope: Scope.REQUEST })
export class AirportLoader {
  constructor(
    @InjectRepository(Airport)
    private readonly airportRepository: Repository<Airport>,
  ) {}

  public readonly loader = new DataLoader<string, Airport>(async (keys: string[]) => {
    const airports = await this.airportRepository.findByIds(keys);
    const airportMap = new Map(airports.map((a) => [a.id, a]));
    return keys.map((key) => airportMap.get(key) || null);
  });
}
