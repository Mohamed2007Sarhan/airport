import { InputType, Field } from '@nestjs/graphql';
import { IsOptional, IsDate, IsString } from 'class-validator';

@InputType()
export class FlightFilterInput {
  @Field({ nullable: true })
  @IsOptional()
  @IsDate({ message: 'Invalid departure time start date' })
  departureTimeStart?: Date;

  @Field({ nullable: true })
  @IsOptional()
  @IsDate({ message: 'Invalid departure time end date' })
  departureTimeEnd?: Date;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  destinationAirportCode?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  airline?: string;
}
