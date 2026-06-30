import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { AirportService } from './airport.service';
import { Airport } from './entities/airport.entity';
import { CreateAirportInput } from './dto/create-airport.input';
import { UpdateAirportInput } from './dto/update-airport.input';
import { GqlAuthGuard } from '../auth/guards/gql-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { UserRole } from '../auth/entities/user.entity';

@Resolver(() => Airport)
export class AirportResolver {
  constructor(private readonly airportService: AirportService) {}

  @Mutation(() => Airport)
  @UseGuards(GqlAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  createAirport(@Args('input') input: CreateAirportInput): Promise<Airport> {
    return this.airportService.create(input);
  }

  @Query(() => [Airport], { name: 'airports' })
  @UseGuards(GqlAuthGuard)
  findAll(): Promise<Airport[]> {
    return this.airportService.findAll();
  }

  @Query(() => Airport, { name: 'airport' })
  @UseGuards(GqlAuthGuard)
  findOne(@Args('id') id: string): Promise<Airport> {
    return this.airportService.findOne(id);
  }

  @Mutation(() => Airport)
  @UseGuards(GqlAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  updateAirport(@Args('input') input: UpdateAirportInput): Promise<Airport> {
    return this.airportService.update(input);
  }

  @Mutation(() => Boolean)
  @UseGuards(GqlAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  removeAirport(@Args('id') id: string): Promise<boolean> {
    return this.airportService.remove(id);
  }
}
