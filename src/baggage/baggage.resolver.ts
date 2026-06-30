import { Resolver, Query, Mutation, Args, ResolveField, Parent } from '@nestjs/graphql';
import { UseGuards, ForbiddenException } from '@nestjs/common';
import { BaggageService } from './baggage.service';
import { Baggage } from './entities/baggage.entity';
import { RegisterBaggageInput } from './dto/register-baggage.input';
import { UpdateBaggageStatusInput } from './dto/update-baggage-status.input';
import { Passenger } from '../passenger/entities/passenger.entity';
import { Flight } from '../flight/entities/flight.entity';
import { PassengerService } from '../passenger/passenger.service';
import { FlightService } from '../flight/flight.service';
import { GqlAuthGuard } from '../auth/guards/gql-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { User, UserRole } from '../auth/entities/user.entity';
import { CurrentUser } from '../auth/decorators/current-user.decorator';

@Resolver(() => Baggage)
export class BaggageResolver {
  constructor(
    private readonly baggageService: BaggageService,
    private readonly passengerService: PassengerService,
    private readonly flightService: FlightService,
  ) {}

  @Mutation(() => Baggage)
  @UseGuards(GqlAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN, UserRole.STAFF)
  registerBaggage(@Args('input') input: RegisterBaggageInput): Promise<Baggage> {
    return this.baggageService.register(input);
  }

  @Mutation(() => Baggage)
  @UseGuards(GqlAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN, UserRole.STAFF)
  updateBaggageStatus(@Args('input') input: UpdateBaggageStatusInput): Promise<Baggage> {
    return this.baggageService.updateStatus(input);
  }

  @Query(() => [Baggage], { name: 'baggages' })
  @UseGuards(GqlAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN, UserRole.STAFF)
  findAll(): Promise<Baggage[]> {
    return this.baggageService.findAll();
  }

  @Query(() => [Baggage], { name: 'myBaggage' })
  @UseGuards(GqlAuthGuard, RolesGuard)
  @Roles(UserRole.PASSENGER)
  myBaggage(@CurrentUser() user: User): Promise<Baggage[]> {
    return this.baggageService.findByUserId(user.id);
  }

  @Query(() => Baggage, { name: 'baggage' })
  @UseGuards(GqlAuthGuard)
  async findOne(
    @CurrentUser() user: User,
    @Args('id') id: string,
  ): Promise<Baggage> {
    const baggage = await this.baggageService.findOne(id);
    if (user.role === UserRole.PASSENGER) {
      const passenger = await this.passengerService.findByUserId(user.id);
      if (baggage.passengerId !== passenger.id) {
        throw new ForbiddenException('You are not authorized to view this baggage');
      }
    }
    return baggage;
  }

  @ResolveField(() => Passenger)
  async passenger(@Parent() baggage: Baggage): Promise<Passenger> {
    return this.passengerService.findOne(baggage.passengerId);
  }

  @ResolveField(() => Flight)
  async flight(@Parent() baggage: Baggage): Promise<Flight> {
    return this.flightService.findOne(baggage.flightId);
  }
}
