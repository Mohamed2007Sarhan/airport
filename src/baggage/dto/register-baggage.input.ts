import { InputType, Field, Float } from '@nestjs/graphql';
import { IsNotEmpty, IsUUID, Min } from 'class-validator';

@InputType()
export class RegisterBaggageInput {
  @Field()
  @IsUUID('4', { message: 'Invalid passenger ID' })
  passengerId: string;

  @Field()
  @IsUUID('4', { message: 'Invalid flight ID' })
  flightId: string;

  @Field()
  @IsNotEmpty({ message: 'Baggage tag number is required' })
  tagNumber: string;

  @Field(() => Float)
  @Min(0.1, { message: 'Baggage weight must be greater than 0' })
  weight: number;
}
