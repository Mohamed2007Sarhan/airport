import { Injectable, NotFoundException, BadRequestException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Connection } from 'typeorm';
import { Booking } from './entities/booking.entity';
import { Flight } from '../flight/entities/flight.entity';
import { Passenger } from '../passenger/entities/passenger.entity';
import { NotificationQueueService } from '../queue/notification-queue.service';

@Injectable()
export class BookingService {
  constructor(
    @InjectRepository(Booking)
    private bookingRepository: Repository<Booking>,
    @InjectRepository(Flight)
    private flightRepository: Repository<Flight>,
    @InjectRepository(Passenger)
    private passengerRepository: Repository<Passenger>,
    private connection: Connection,
    private notificationQueueService: NotificationQueueService,
  ) {}

  async bookFlight(userId: string, flightId: string, seatNumber: string): Promise<Booking> {
    const passenger = await this.passengerRepository.findOne({
      where: { userId },
      relations: ['user'],
    });
    if (!passenger) {
      throw new NotFoundException(`Passenger profile not found for user ${userId}`);
    }

    return this.connection.transaction(async (entityManager) => {
      // Row lock flight to prevent concurrent booking race conditions (double bookings)
      const flight = await entityManager.findOne(Flight, flightId, {
        lock: { mode: 'pessimistic_write' },
      });
      if (!flight) {
        throw new NotFoundException(`Flight with ID ${flightId} not found`);
      }

      if (flight.availableSeats <= 0) {
        throw new BadRequestException('No seats available on this flight');
      }

      const existingSeatBooking = await entityManager.findOne(Booking, {
        where: { flightId, seatNumber },
      });
      if (existingSeatBooking) {
        throw new ConflictException(`Seat ${seatNumber} is already taken on flight ${flight.flightNumber}`);
      }

      const booking = new Booking();
      booking.passengerId = passenger.id;
      booking.flightId = flightId;
      booking.seatNumber = seatNumber;
      const savedBooking = await entityManager.save(booking);

      flight.availableSeats -= 1;
      await entityManager.save(flight);

      // Async notification confirmation
      await this.notificationQueueService.addBookingConfirmation(
        passenger.user.email,
        passenger.name,
        flight.flightNumber,
        seatNumber,
      );

      return savedBooking;
    });
  }

  async findPassengerBookings(userId: string): Promise<Booking[]> {
    const passenger = await this.passengerRepository.findOne({ where: { userId } });
    if (!passenger) {
      throw new NotFoundException(`Passenger profile not found`);
    }
    return this.bookingRepository.find({
      where: { passengerId: passenger.id },
      relations: ['flight'],
    });
  }

  async findFlightBookings(flightId: string): Promise<Booking[]> {
    return this.bookingRepository.find({
      where: { flightId },
      relations: ['passenger'],
    });
  }

  async findOne(id: string): Promise<Booking> {
    const booking = await this.bookingRepository.findOne({
      where: { id },
      relations: ['passenger', 'flight'],
    });
    if (!booking) {
      throw new NotFoundException(`Booking with ID ${id} not found`);
    }
    return booking;
  }
}
