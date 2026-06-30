import { Repository } from 'typeorm';
import * as DataLoader from 'dataloader';
import { Airport } from './entities/airport.entity';
export declare class AirportLoader {
    private readonly airportRepository;
    constructor(airportRepository: Repository<Airport>);
    readonly loader: DataLoader<string, Airport, string>;
}
