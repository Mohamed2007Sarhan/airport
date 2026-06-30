"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FlightModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const flight_entity_1 = require("./entities/flight.entity");
const booking_entity_1 = require("../booking/entities/booking.entity");
const flight_service_1 = require("./flight.service");
const flight_resolver_1 = require("./flight.resolver");
const flight_subscription_resolver_1 = require("./flight.subscription.resolver");
const airport_module_1 = require("../airport/airport.module");
const queue_module_1 = require("../queue/queue.module");
const auth_module_1 = require("../auth/auth.module");
let FlightModule = class FlightModule {
};
FlightModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([flight_entity_1.Flight, booking_entity_1.Booking]),
            airport_module_1.AirportModule,
            queue_module_1.QueueModule,
            auth_module_1.AuthModule,
        ],
        providers: [flight_service_1.FlightService, flight_resolver_1.FlightResolver, flight_subscription_resolver_1.FlightSubscriptionResolver],
        exports: [flight_service_1.FlightService, typeorm_1.TypeOrmModule],
    })
], FlightModule);
exports.FlightModule = FlightModule;
//# sourceMappingURL=flight.module.js.map