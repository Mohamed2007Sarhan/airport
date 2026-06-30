import { Resolver, Query, Args } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { PassengerService } from './passenger.service';
import { Passenger } from './entities/passenger.entity';
import { GqlAuthGuard } from '../auth/guards/gql-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { User, UserRole } from '../auth/entities/user.entity';
import { CurrentUser } from '../auth/decorators/current-user.decorator';

@Resolver(() => Passenger)
export class PassengerResolver {
  constructor(private readonly passengerService: PassengerService) {}

  @Query(() => Passenger, { name: 'mePassenger' })
  @UseGuards(GqlAuthGuard, RolesGuard)
  @Roles(UserRole.PASSENGER)
  async getProfile(@CurrentUser() user: User): Promise<Passenger> {
    return this.passengerService.findByUserId(user.id);
  }

  @Query(() => [Passenger], { name: 'passengers' })
  @UseGuards(GqlAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  findAll(): Promise<Passenger[]> {
    return this.passengerService.findAll();
  }

  @Query(() => Passenger, { name: 'passenger' })
  @UseGuards(GqlAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN, UserRole.STAFF)
  findOne(@Args('id') id: string): Promise<Passenger> {
    return this.passengerService.findOne(id);
  }
}
