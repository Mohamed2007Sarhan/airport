import { InputType, Field, Int } from '@nestjs/graphql';
import { IsNotEmpty, IsUUID, Min, IsDate } from 'class-validator';

@InputType()
export class CreateFlightInput {
  @Field()
  @IsNotEmpty({ message: 'Flight number is required' })
  flightNumber: string;

  @Field()
  @IsUUID('4', { message: 'Invalid departure airport ID' })
  departureAirportId: string;

  @Field()
  @IsUUID('4', { message: 'Invalid destination airport ID' })
  destinationAirportId: string;

  @Field()
  @IsDate({ message: 'Invalid departure time' })
  departureTime: Date;

  @Field()
  @IsDate({ message: 'Invalid arrival time' })
  arrivalTime: Date;

  @Field()
  @IsNotEmpty({ message: 'Airline is required' })
  airline: string;

  @Field(() => Int)
  @Min(0, { message: 'Available seats cannot be negative' })
  availableSeats: number;
}
