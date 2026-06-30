"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookingModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const booking_entity_1 = require("./entities/booking.entity");
const booking_service_1 = require("./booking.service");
const booking_resolver_1 = require("./booking.resolver");
const passenger_module_1 = require("../passenger/passenger.module");
const flight_module_1 = require("../flight/flight.module");
const queue_module_1 = require("../queue/queue.module");
const auth_module_1 = require("../auth/auth.module");
let BookingModule = class BookingModule {
};
BookingModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([booking_entity_1.Booking]),
            passenger_module_1.PassengerModule,
            flight_module_1.FlightModule,
            queue_module_1.QueueModule,
            auth_module_1.AuthModule,
        ],
        providers: [booking_service_1.BookingService, booking_resolver_1.BookingResolver],
        exports: [booking_service_1.BookingService],
    })
], BookingModule);
exports.BookingModule = BookingModule;
//# sourceMappingURL=booking.module.js.map