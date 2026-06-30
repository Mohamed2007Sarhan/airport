import { Resolver, Query, Mutation, Args, ResolveField, Parent, Subscription } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { PubSub } from 'graphql-subscriptions';
import { FlightService } from './flight.service';
import { Flight, FlightStatus } from './entities/flight.entity';
import { Airport } from '../airport/entities/airport.entity';
import { AirportLoader } from '../airport/airport.loader';
import { CreateFlightInput } from './dto/create-flight.input';
import { UpdateFlightInput } from './dto/update-flight.input';
import { FlightFilterInput } from './dto/flight-filter.input';
import { FlightsResponse } from './dto/flights-response.type';
import { GqlAuthGuard } from '../auth/guards/gql-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { UserRole } from '../auth/entities/user.entity';

export const pubSub = new PubSub();

@Resolver(() => Flight)
export class FlightResolver {
  constructor(
    private readonly flightService: FlightService,
    private readonly airportLoader: AirportLoader,
  ) {}

  @Mutation(() => Flight)
  @UseGuards(GqlAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  createFlight(@Args('input') input: CreateFlightInput): Promise<Flight> {
    return this.flightService.create(input);
  }

  @Query(() => FlightsResponse, { name: 'flights' })
  @UseGuards(GqlAuthGuard)
  findAll(
    @Args('limit', { type: () => Number, defaultValue: 10 }) limit: number,
    @Args('offset', { type: () => Number, defaultValue: 0 }) offset: number,
    @Args('filter', { nullable: true }) filter?: FlightFilterInput,
  ): Promise<FlightsResponse> {
    return this.flightService.findAll(limit, offset, filter);
  }

  @Query(() => Flight, { name: 'flight' })
  @UseGuards(GqlAuthGuard)
  findOne(@Args('id') id: string): Promise<Flight> {
    return this.flightService.findOne(id);
  }

  @Mutation(() => Flight)
  @UseGuards(GqlAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  updateFlight(@Args('input') input: UpdateFlightInput): Promise<Flight> {
    return this.flightService.update(input);
  }

  @Mutation(() => Flight)
  @UseGuards(GqlAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN, UserRole.STAFF)
  async updateFlightStatus(
    @Args('id') id: string,
    @Args('status', { type: () => FlightStatus }) status: FlightStatus,
  ): Promise<Flight> {
    const updatedFlight = await this.flightService.updateStatus(id, status);
    
    // Publish update event for subscriptions
    pubSub.publish('flightStatusUpdated', { flightStatusUpdated: updatedFlight });
    
    return updatedFlight;
  }

  @Mutation(() => Boolean)
  @UseGuards(GqlAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  removeFlight(@Args('id') id: string): Promise<boolean> {
    return this.flightService.remove(id);
  }

  // Resolve departureAirport field using DataLoader (resolves N+1)
  @ResolveField(() => Airport)
  async departureAirport(@Parent() flight: Flight): Promise<Airport> {
    return this.airportLoader.loader.load(flight.departureAirportId);
  }

  // Resolve destinationAirport field using DataLoader (resolves N+1)
  @ResolveField(() => Airport)
  async destinationAirport(@Parent() flight: Flight): Promise<Airport> {
    return this.airportLoader.loader.load(flight.destinationAirportId);
  }
}

