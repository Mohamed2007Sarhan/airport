import { InputType, Field, ID } from '@nestjs/graphql';
import { IsUUID, IsOptional, Length } from 'class-validator';

@InputType()
export class UpdateAirportInput {
  @Field(() => ID)
  @IsUUID('4', { message: 'Invalid airport ID' })
  id: string;

  @Field({ nullable: true })
  @IsOptional()
  @Length(3, 10, { message: 'Airport code must be between 3 and 10 characters' })
  code?: string;

  @Field({ nullable: true })
  @IsOptional()
  name?: string;

  @Field({ nullable: true })
  @IsOptional()
  city?: string;

  @Field({ nullable: true })
  @IsOptional()
  country?: string;
}
