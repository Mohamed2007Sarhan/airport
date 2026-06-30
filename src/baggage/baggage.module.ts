import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Baggage } from './entities/baggage.entity';
import { BaggageService } from './baggage.service';
import { BaggageResolver } from './baggage.resolver';
import { PassengerModule } from '../passenger/passenger.module';
import { FlightModule } from '../flight/flight.module';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Baggage]),
    PassengerModule,
    FlightModule,
    AuthModule,
  ],
  providers: [BaggageService, BaggageResolver],
  exports: [BaggageService],
})
export class BaggageModule {}
