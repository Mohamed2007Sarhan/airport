import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Flight, FlightStatus } from './entities/flight.entity';
import { Airport } from '../airport/entities/airport.entity';
import { Booking } from '../booking/entities/booking.entity';
import { CreateFlightInput } from './dto/create-flight.input';
import { UpdateFlightInput } from './dto/update-flight.input';
import { FlightFilterInput } from './dto/flight-filter.input';
import { FlightsResponse } from './dto/flights-response.type';
import { NotificationQueueService } from '../queue/notification-queue.service';

@Injectable()
export class FlightService {
  constructor(
    @InjectRepository(Flight)
    private flightRepository: Repository<Flight>,
    @InjectRepository(Airport)
    private airportRepository: Repository<Airport>,
    @InjectRepository(Booking)
    private bookingRepository: Repository<Booking>,
    private notificationQueueService: NotificationQueueService,
  ) {}

  async create(input: CreateFlightInput): Promise<Flight> {
    const departure = await this.airportRepository.findOne({ where: { id: input.departureAirportId } });
    if (!departure) {
      throw new NotFoundException(`Departure airport with ID ${input.departureAirportId} not found`);
    }

    const destination = await this.airportRepository.findOne({ where: { id: input.destinationAirportId } });
    if (!destination) {
      throw new NotFoundException(`Destination airport with ID ${input.destinationAirportId} not found`);
    }

    if (input.departureAirportId === input.destinationAirportId) {
      throw new BadRequestException('Departure and destination airports cannot be the same');
    }

    if (new Date(input.arrivalTime) <= new Date(input.departureTime)) {
      throw new BadRequestException('Arrival time must be after departure time');
    }

    const flight = this.flightRepository.create(input);
    return this.flightRepository.save(flight);
  }

  async findAll(
    limit: number = 10,
    offset: number = 0,
    filter?: FlightFilterInput,
  ): Promise<FlightsResponse> {
    const query = this.flightRepository.createQueryBuilder('flight');

    if (filter) {
      if (filter.airline) {
        query.andWhere('flight.airline ILIKE :airline', { airline: `%${filter.airline}%` });
      }
      if (filter.departureTimeStart) {
        query.andWhere('flight.departureTime >= :start', { start: filter.departureTimeStart });
      }
      if (filter.departureTimeEnd) {
        query.andWhere('flight.departureTime <= :end', { end: filter.departureTimeEnd });
      }
      if (filter.destinationAirportCode) {
        query.innerJoin('flight.destinationAirport', 'dest')
             .andWhere('dest.code = :code', { code: filter.destinationAirportCode.toUpperCase() });
      }
    }

    query.skip(offset).take(limit).orderBy('flight.departureTime', 'ASC');

    const [items, total] = await query.getManyAndCount();
    return { items, total };
  }

  async findOne(id: string): Promise<Flight> {
    const flight = await this.flightRepository.findOne({ where: { id } });
    if (!flight) {
      throw new NotFoundException(`Flight with ID ${id} not found`);
    }
    return flight;
  }

  async update(input: UpdateFlightInput): Promise<Flight> {
    const { id, ...data } = input;
    const flight = await this.findOne(id);

    if (data.departureAirportId) {
      const departure = await this.airportRepository.findOne({ where: { id: data.departureAirportId } });
      if (!departure) {
        throw new NotFoundException(`Departure airport with ID ${data.departureAirportId} not found`);
      }
    }

    if (data.destinationAirportId) {
      const destination = await this.airportRepository.findOne({ where: { id: data.destinationAirportId } });
      if (!destination) {
        throw new NotFoundException(`Destination airport with ID ${data.destinationAirportId} not found`);
      }
    }

    const newDepId = data.departureAirportId || flight.departureAirportId;
    const newDestId = data.destinationAirportId || flight.destinationAirportId;
    if (newDepId === newDestId) {
      throw new BadRequestException('Departure and destination airports cannot be the same');
    }

    const newDepTime = data.departureTime ? new Date(data.departureTime) : new Date(flight.departureTime);
    const newArrTime = data.arrivalTime ? new Date(data.arrivalTime) : new Date(flight.arrivalTime);
    if (newArrTime <= newDepTime) {
      throw new BadRequestException('Arrival time must be after departure time');
    }

    Object.assign(flight, data);
    return this.flightRepository.save(flight);
  }

  async updateStatus(id: string, status: FlightStatus): Promise<Flight> {
    const flight = await this.findOne(id);
    const oldStatus = flight.status;
    flight.status = status;
    const savedFlight = await this.flightRepository.save(flight);

    // Alert passengers if flight delayed or canceled
    if (oldStatus !== status && (status === FlightStatus.DELAYED || status === FlightStatus.CANCELED)) {
      const bookings = await this.bookingRepository.find({
        where: { flightId: id },
        relations: ['passenger', 'passenger.user'],
      });

      for (const booking of bookings) {
        if (booking.passenger && booking.passenger.user) {
          await this.notificationQueueService.addFlightStatusAlert(
            booking.passenger.user.email,
            booking.passenger.name,
            flight.flightNumber,
            status,
          );
        }
      }
    }

    return savedFlight;
  }

  async remove(id: string): Promise<boolean> {
    const flight = await this.findOne(id);
    await this.flightRepository.remove(flight);
    return true;
  }
}
