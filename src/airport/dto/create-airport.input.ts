import { InputType, Field } from '@nestjs/graphql';
import { IsNotEmpty, Length } from 'class-validator';

@InputType()
export class CreateAirportInput {
  @Field()
  @Length(3, 10, { message: 'Airport code must be between 3 and 10 characters' })
  code: string;

  @Field()
  @IsNotEmpty({ message: 'Airport name is required' })
  name: string;

  @Field()
  @IsNotEmpty({ message: 'City is required' })
  city: string;

  @Field()
  @IsNotEmpty({ message: 'Country is required' })
  country: string;
}
