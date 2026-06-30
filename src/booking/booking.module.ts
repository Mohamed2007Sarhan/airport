import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Booking } from './entities/booking.entity';
import { BookingService } from './booking.service';
import { BookingResolver } from './booking.resolver';
import { PassengerModule } from '../passenger/passenger.module';
import { FlightModule } from '../flight/flight.module';
import { QueueModule } from '../queue/queue.module';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Booking]),
    PassengerModule,
    FlightModule,
    QueueModule,
    AuthModule,
  ],
  providers: [BookingService, BookingResolver],
  exports: [BookingService],
})
export class BookingModule {}
