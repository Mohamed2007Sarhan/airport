import { AirportService } from './airport.service';
import { Airport } from './entities/airport.entity';
import { CreateAirportInput } from './dto/create-airport.input';
import { UpdateAirportInput } from './dto/update-airport.input';
export declare class AirportResolver {
    private readonly airportService;
    constructor(airportService: AirportService);
    createAirport(input: CreateAirportInput): Promise<Airport>;
    findAll(): Promise<Airport[]>;
    findOne(id: string): Promise<Airport>;
    updateAirport(input: UpdateAirportInput): Promise<Airport>;
    removeAirport(id: string): Promise<boolean>;
}
