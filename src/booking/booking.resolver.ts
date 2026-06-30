import { Resolver, Query, Mutation, Args, ResolveField, Parent } from '@nestjs/graphql';
import { UseGuards, ForbiddenException } from '@nestjs/common';
import { BookingService } from './booking.service';
import { Booking } from './entities/booking.entity';
import { Passenger } from '../passenger/entities/passenger.entity';
import { Flight } from '../flight/entities/flight.entity';
import { PassengerService } from '../passenger/passenger.service';
import { FlightService } from '../flight/flight.service';
import { GqlAuthGuard } from '../auth/guards/gql-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { User, UserRole } from '../auth/entities/user.entity';
import { CurrentUser } from '../auth/decorators/current-user.decorator';

@Resolver(() => Booking)
export class BookingResolver {
  constructor(
    private readonly bookingService: BookingService,
    private readonly passengerService: PassengerService,
    private readonly flightService: FlightService,
  ) {}

  @Mutation(() => Booking)
  @UseGuards(GqlAuthGuard, RolesGuard)
  @Roles(UserRole.PASSENGER)
  async bookFlight(
    @CurrentUser() user: User,
    @Args('flightId') flightId: string,
    @Args('seatNumber') seatNumber: string,
  ): Promise<Booking> {
    return this.bookingService.bookFlight(user.id, flightId, seatNumber);
  }

  @Query(() => [Booking], { name: 'myBookings' })
  @UseGuards(GqlAuthGuard, RolesGuard)
  @Roles(UserRole.PASSENGER)
  async myBookings(@CurrentUser() user: User): Promise<Booking[]> {
    return this.bookingService.findPassengerBookings(user.id);
  }

  @Query(() => [Booking], { name: 'flightBookings' })
  @UseGuards(GqlAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN, UserRole.STAFF)
  async flightBookings(@Args('flightId') flightId: string): Promise<Booking[]> {
    return this.bookingService.findFlightBookings(flightId);
  }

  @Query(() => Booking, { name: 'booking' })
  @UseGuards(GqlAuthGuard)
  async findOne(
    @CurrentUser() user: User,
    @Args('id') id: string,
  ): Promise<Booking> {
    const booking = await this.bookingService.findOne(id);
    // Passengers can only view their own bookings
    if (user.role === UserRole.PASSENGER) {
      const passenger = await this.passengerService.findByUserId(user.id);
      if (booking.passengerId !== passenger.id) {
        throw new ForbiddenException('You are not authorized to view this booking');
      }
    }
    return booking;
  }

  @ResolveField(() => Passenger)
  async passenger(@Parent() booking: Booking): Promise<Passenger> {
    return this.passengerService.findOne(booking.passengerId);
  }

  @ResolveField(() => Flight)
  async flight(@Parent() booking: Booking): Promise<Flight> {
    return this.flightService.findOne(booking.flightId);
  }
}
