import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Passenger } from './entities/passenger.entity';
import { PassengerService } from './passenger.service';
import { PassengerResolver } from './passenger.resolver';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Passenger]),
    AuthModule,
  ],
  providers: [PassengerService, PassengerResolver],
  exports: [PassengerService, TypeOrmModule],
})
export class PassengerModule {}
