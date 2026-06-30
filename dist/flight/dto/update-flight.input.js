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
exports.UpdateFlightInput = void 0;
const graphql_1 = require("@nestjs/graphql");
const class_validator_1 = require("class-validator");
const flight_entity_1 = require("../entities/flight.entity");
let UpdateFlightInput = class UpdateFlightInput {
};
__decorate([
    (0, graphql_1.Field)(() => graphql_1.ID),
    (0, class_validator_1.IsUUID)('4', { message: 'Invalid flight ID' }),
    __metadata("design:type", String)
], UpdateFlightInput.prototype, "id", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateFlightInput.prototype, "flightNumber", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsUUID)('4', { message: 'Invalid departure airport ID' }),
    __metadata("design:type", String)
], UpdateFlightInput.prototype, "departureAirportId", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsUUID)('4', { message: 'Invalid destination airport ID' }),
    __metadata("design:type", String)
], UpdateFlightInput.prototype, "destinationAirportId", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDate)({ message: 'Invalid departure time' }),
    __metadata("design:type", Date)
], UpdateFlightInput.prototype, "departureTime", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDate)({ message: 'Invalid arrival time' }),
    __metadata("design:type", Date)
], UpdateFlightInput.prototype, "arrivalTime", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateFlightInput.prototype, "airline", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int, { nullable: true }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.Min)(0, { message: 'Available seats cannot be negative' }),
    __metadata("design:type", Number)
], UpdateFlightInput.prototype, "availableSeats", void 0);
__decorate([
    (0, graphql_1.Field)(() => flight_entity_1.FlightStatus, { nullable: true }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateFlightInput.prototype, "status", void 0);
UpdateFlightInput = __decorate([
    (0, graphql_1.InputType)()
], UpdateFlightInput);
exports.UpdateFlightInput = UpdateFlightInput;
//# sourceMappingURL=update-flight.input.js.map