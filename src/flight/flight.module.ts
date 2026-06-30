import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Flight } from './entities/flight.entity';
import { Booking } from '../booking/entities/booking.entity';
import { FlightService } from './flight.service';
import { FlightResolver } from './flight.resolver';
import { FlightSubscriptionResolver } from './flight.subscription.resolver';
import { AirportModule } from '../airport/airport.module';
import { QueueModule } from '../queue/queue.module';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Flight, Booking]),
    AirportModule,
    QueueModule,
    AuthModule,
  ],
  providers: [FlightService, FlightResolver, FlightSubscriptionResolver],
  exports: [FlightService, TypeOrmModule],
})
export class FlightModule {}
