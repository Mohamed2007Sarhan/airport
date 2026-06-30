import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Flight } from '../entities/flight.entity';

@ObjectType()
export class FlightsResponse {
  @Field(() => [Flight])
  items: Flight[];

  @Field(() => Int)
  total: number;
}
