import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Staff } from './entities/staff.entity';
import { User } from '../auth/entities/user.entity';
import { StaffService } from './staff.service';
import { StaffResolver } from './staff.resolver';
import { AuthModule } from '../auth/auth.module';
import { FlightModule } from '../flight/flight.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Staff, User]),
    AuthModule,
    forwardRef(() => FlightModule), // forwardRef to prevent circular dependency since Flight and Staff link to each other
  ],
  providers: [StaffService, StaffResolver],
  exports: [StaffService, TypeOrmModule],
})
export class StaffModule {}
