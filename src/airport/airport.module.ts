import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Airport } from './entities/airport.entity';
import { AirportService } from './airport.service';
import { AirportResolver } from './airport.resolver';
import { AirportLoader } from './airport.loader';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Airport]),
    AuthModule,
  ],
  providers: [AirportService, AirportResolver, AirportLoader],
  exports: [AirportService, TypeOrmModule, AirportLoader],
})
export class AirportModule {}
