"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Booking = void 0;
const typeorm_1 = require("typeorm");
const graphql_1 = require("@nestjs/graphql");
const passenger_entity_1 = require("../../passenger/entities/passenger.entity");
const flight_entity_1 = require("../../flight/entities/flight.entity");
let Booking = class Booking {
};
__decorate([
    (0, graphql_1.Field)(() => graphql_1.ID),
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], Booking.prototype, "id", void 0);
__decorate([
    (0, graphql_1.Field)(() => passenger_entity_1.Passenger),
    (0, typeorm_1.ManyToOne)(() => passenger_entity_1.Passenger, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'passengerId' }),
    __metadata("design:type", passenger_entity_1.Passenger)
], Booking.prototype, "passenger", void 0);
__decorate([
    (0, graphql_1.Field)(),
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Booking.prototype, "passengerId", void 0);
__decorate([
    (0, graphql_1.Field)(() => flight_entity_1.Flight),
    (0, typeorm_1.ManyToOne)(() => flight_entity_1.Flight, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'flightId' }),
    __metadata("design:type", flight_entity_1.Flight)
], Booking.prototype, "flight", void 0);
__decorate([
    (0, graphql_1.Field)(),
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Booking.prototype, "flightId", void 0);
__decorate([
    (0, graphql_1.Field)(),
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Booking.prototype, "seatNumber", void 0);
__decorate([
    (0, graphql_1.Field)(),
    (0, typeorm_1.CreateDateColumn)({ type: 'timestamp' }),
    __metadata("design:type", Date)
], Booking.prototype, "bookingDate", void 0);
Booking = __decorate([
    (0, graphql_1.ObjectType)(),
    (0, typeorm_1.Entity)('bookings'),
    (0, typeorm_1.Unique)(['flightId', 'seatNumber'])
], Booking);
exports.Booking = Booking;
//# sourceMappingURL=booking.entity.js.map