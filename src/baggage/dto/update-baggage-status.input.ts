import { InputType, Field, ID } from '@nestjs/graphql';
import { IsUUID } from 'class-validator';
import { BaggageStatus } from '../entities/baggage.entity';

@InputType()
export class UpdateBaggageStatusInput {
  @Field(() => ID)
  @IsUUID('4', { message: 'Invalid baggage ID' })
  id: string;

  @Field(() => BaggageStatus)
  status: BaggageStatus;
}
