import { Repository } from 'typeorm';
import { Airport } from './entities/airport.entity';
import { CreateAirportInput } from './dto/create-airport.input';
import { UpdateAirportInput } from './dto/update-airport.input';
export declare class AirportService {
    private airportRepository;
    constructor(airportRepository: Repository<Airport>);
    create(input: CreateAirportInput): Promise<Airport>;
    findAll(): Promise<Airport[]>;
    findOne(id: string): Promise<Airport>;
    update(input: UpdateAirportInput): Promise<Airport>;
    remove(id: string): Promise<boolean>;
}
