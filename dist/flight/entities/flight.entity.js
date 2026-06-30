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
exports.Flight = exports.FlightStatus = void 0;
const typeorm_1 = require("typeorm");
const graphql_1 = require("@nestjs/graphql");
const airport_entity_1 = require("../../airport/entities/airport.entity");
var FlightStatus;
(function (FlightStatus) {
    FlightStatus["ON_TIME"] = "ON_TIME";
    FlightStatus["DELAYED"] = "DELAYED";
    FlightStatus["CANCELED"] = "CANCELED";
})(FlightStatus = exports.FlightStatus || (exports.FlightStatus = {}));
(0, graphql_1.registerEnumType)(FlightStatus, {
    name: 'FlightStatus',
});
let Flight = class Flight {
};
__decorate([
    (0, graphql_1.Field)(() => graphql_1.ID),
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], Flight.prototype, "id", void 0);
__decorate([
    (0, graphql_1.Field)(),
    (0, typeorm_1.Column)({ unique: true }),
    __metadata("design:type", String)
], Flight.prototype, "flightNumber", void 0);
__decorate([
    (0, graphql_1.Field)(() => airport_entity_1.Airport),
    (0, typeorm_1.ManyToOne)(() => airport_entity_1.Airport, { onDelete: 'RESTRICT' }),
    (0, typeorm_1.JoinColumn)({ name: 'departureAirportId' }),
    __metadata("design:type", airport_entity_1.Airport)
], Flight.prototype, "departureAirport", void 0);
__decorate([
    (0, graphql_1.Field)(),
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Flight.prototype, "departureAirportId", void 0);
__decorate([
    (0, graphql_1.Field)(() => airport_entity_1.Airport),
    (0, typeorm_1.ManyToOne)(() => airport_entity_1.Airport, { onDelete: 'RESTRICT' }),
    (0, typeorm_1.JoinColumn)({ name: 'destinationAirportId' }),
    __metadata("design:type", airport_entity_1.Airport)
], Flight.prototype, "destinationAirport", void 0);
__decorate([
    (0, graphql_1.Field)(),
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Flight.prototype, "destinationAirportId", void 0);
__decorate([
    (0, graphql_1.Field)(),
    (0, typeorm_1.Column)({ type: 'timestamp' }),
    __metadata("design:type", Date)
], Flight.prototype, "departureTime", void 0);
__decorate([
    (0, graphql_1.Field)(),
    (0, typeorm_1.Column)({ type: 'timestamp' }),
    __metadata("design:type", Date)
], Flight.prototype, "arrivalTime", void 0);
__decorate([
    (0, graphql_1.Field)(),
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Flight.prototype, "airline", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int),
    (0, typeorm_1.Column)({ type: 'int', default: 0 }),
    __metadata("design:type", Number)
], Flight.prototype, "availableSeats", void 0);
__decorate([
    (0, graphql_1.Field)(() => FlightStatus),
    (0, typeorm_1.Column)({
        type: 'varchar',
        length: 50,
        default: FlightStatus.ON_TIME,
    }),
    __metadata("design:type", String)
], Flight.prototype, "status", void 0);
Flight = __decorate([
    (0, graphql_1.ObjectType)(),
    (0, typeorm_1.Entity)('flights')
], Flight);
exports.Flight = Flight;
//# sourceMappingURL=flight.entity.js.map