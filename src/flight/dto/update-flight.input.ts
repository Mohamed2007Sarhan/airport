import { InputType, Field, ID, Int } from '@nestjs/graphql';
import { IsUUID, IsOptional, Min, IsDate } from 'class-validator';
import { FlightStatus } from '../entities/flight.entity';

@InputType()
export class UpdateFlightInput {
  @Field(() => ID)
  @IsUUID('4', { message: 'Invalid flight ID' })
  id: string;

  @Field({ nullable: true })
  @IsOptional()
  flightNumber?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsUUID('4', { message: 'Invalid departure airport ID' })
  departureAirportId?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsUUID('4', { message: 'Invalid destination airport ID' })
  destinationAirportId?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsDate({ message: 'Invalid departure time' })
  departureTime?: Date;

  @Field({ nullable: true })
  @IsOptional()
  @IsDate({ message: 'Invalid arrival time' })
  arrivalTime?: Date;

  @Field({ nullable: true })
  @IsOptional()
  airline?: string;

  @Field(() => Int, { nullable: true })
  @IsOptional()
  @Min(0, { message: 'Available seats cannot be negative' })
  availableSeats?: number;

  @Field(() => FlightStatus, { nullable: true })
  @IsOptional()
  status?: FlightStatus;
}
