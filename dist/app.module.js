"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const typeorm_1 = require("@nestjs/typeorm");
const graphql_1 = require("@nestjs/graphql");
const auth_module_1 = require("./auth/auth.module");
const airport_module_1 = require("./airport/airport.module");
const flight_module_1 = require("./flight/flight.module");
const passenger_module_1 = require("./passenger/passenger.module");
const staff_module_1 = require("./staff/staff.module");
const booking_module_1 = require("./booking/booking.module");
const baggage_module_1 = require("./baggage/baggage.module");
const queue_module_1 = require("./queue/queue.module");
const user_entity_1 = require("./auth/entities/user.entity");
const airport_entity_1 = require("./airport/entities/airport.entity");
const flight_entity_1 = require("./flight/entities/flight.entity");
const passenger_entity_1 = require("./passenger/entities/passenger.entity");
const staff_entity_1 = require("./staff/entities/staff.entity");
const booking_entity_1 = require("./booking/entities/booking.entity");
const baggage_entity_1 = require("./baggage/entities/baggage.entity");
let AppModule = class AppModule {
};
AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                isGlobal: true,
                envFilePath: '.env',
            }),
            typeorm_1.TypeOrmModule.forRootAsync({
                imports: [config_1.ConfigModule],
                inject: [config_1.ConfigService],
                useFactory: (config) => ({
                    type: 'postgres',
                    host: config.get('DB_HOST', 'localhost'),
                    port: config.get('DB_PORT', 5432),
                    username: config.get('DB_USERNAME', 'postgres'),
                    password: config.get('DB_PASSWORD'),
                    database: config.get('DB_NAME', 'airport_management'),
                    entities: [user_entity_1.User, airport_entity_1.Airport, flight_entity_1.Flight, passenger_entity_1.Passenger, staff_entity_1.Staff, booking_entity_1.Booking, baggage_entity_1.Baggage],
                    synchronize: true,
                    logging: false,
                }),
            }),
            graphql_1.GraphQLModule.forRoot({
                autoSchemaFile: 'schema.gql',
                installSubscriptionHandlers: true,
                context: ({ req }) => ({ req }),
                playground: true,
            }),
            auth_module_1.AuthModule,
            airport_module_1.AirportModule,
            flight_module_1.FlightModule,
            passenger_module_1.PassengerModule,
            staff_module_1.StaffModule,
            booking_module_1.BookingModule,
            baggage_module_1.BaggageModule,
            queue_module_1.QueueModule,
        ],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map