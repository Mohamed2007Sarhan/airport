import { Resolver, Subscription, Args } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { Flight } from './entities/flight.entity';
import { pubSub } from './flight.resolver';
import { GqlAuthGuard } from '../auth/guards/gql-auth.guard';

@Resolver(() => Flight)
export class FlightSubscriptionResolver {
  // Real-time Flight Status update subscription (Singleton resolver)
  @Subscription(() => Flight, {
    filter: (payload, variables) => {
      return payload.flightStatusUpdated.id === variables.flightId;
    },
    resolve: (payload) => payload.flightStatusUpdated,
  })
  @UseGuards(GqlAuthGuard)
  flightStatusUpdated(@Args('flightId') flightId: string) {
    return pubSub.asyncIterator('flightStatusUpdated');
  }
}
