import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GraphQLModule } from '@nestjs/graphql';
import { AuthModule } from './auth/auth.module';
import { AirportModule } from './airport/airport.module';
import { FlightModule } from './flight/flight.module';
import { PassengerModule } from './passenger/passenger.module';
import { StaffModule } from './staff/staff.module';
import { BookingModule } from './booking/booking.module';
import { BaggageModule } from './baggage/baggage.module';
import { QueueModule } from './queue/queue.module';

// Import entities for database mapping
import { User } from './auth/entities/user.entity';
import { Airport } from './airport/entities/airport.entity';
import { Flight } from './flight/entities/flight.entity';
import { Passenger } from './passenger/entities/passenger.entity';
import { Staff } from './staff/entities/staff.entity';
import { Booking } from './booking/entities/booking.entity';
import { Baggage } from './baggage/entities/baggage.entity';

@Module({
  imports: [
    // Configuration Module
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),

    // Database Connection Module (TypeORM)
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'postgres',
        host: config.get<string>('DB_HOST', 'localhost'),
        port: config.get<number>('DB_PORT', 5432),
        username: config.get<string>('DB_USERNAME', 'postgres'),
        password: config.get<string>('DB_PASSWORD'),
        database: config.get<string>('DB_NAME', 'airport_management'),
        entities: [User, Airport, Flight, Passenger, Staff, Booking, Baggage],
        synchronize: true, // Automatically synchronize tables in dev mode
        logging: false,
      }),
    }),

    // GraphQL Setup Module (Code-first approach)
    GraphQLModule.forRoot({
      autoSchemaFile: 'schema.gql',
      installSubscriptionHandlers: true, // Enables Subscriptions support in GraphQL v9
      context: ({ req }) => ({ req }),
      playground: true,
    }),

    // Feature Modules
    AuthModule,
    AirportModule,
    FlightModule,
    PassengerModule,
    StaffModule,
    BookingModule,
    BaggageModule,
    QueueModule,
  ],
})
export class AppModule {}
