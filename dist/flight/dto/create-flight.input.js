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
exports.CreateFlightInput = void 0;
const graphql_1 = require("@nestjs/graphql");
const class_validator_1 = require("class-validator");
let CreateFlightInput = class CreateFlightInput {
};
__decorate([
    (0, graphql_1.Field)(),
    (0, class_validator_1.IsNotEmpty)({ message: 'Flight number is required' }),
    __metadata("design:type", String)
], CreateFlightInput.prototype, "flightNumber", void 0);
__decorate([
    (0, graphql_1.Field)(),
    (0, class_validator_1.IsUUID)('4', { message: 'Invalid departure airport ID' }),
    __metadata("design:type", String)
], CreateFlightInput.prototype, "departureAirportId", void 0);
__decorate([
    (0, graphql_1.Field)(),
    (0, class_validator_1.IsUUID)('4', { message: 'Invalid destination airport ID' }),
    __metadata("design:type", String)
], CreateFlightInput.prototype, "destinationAirportId", void 0);
__decorate([
    (0, graphql_1.Field)(),
    (0, class_validator_1.IsDate)({ message: 'Invalid departure time' }),
    __metadata("design:type", Date)
], CreateFlightInput.prototype, "departureTime", void 0);
__decorate([
    (0, graphql_1.Field)(),
    (0, class_validator_1.IsDate)({ message: 'Invalid arrival time' }),
    __metadata("design:type", Date)
], CreateFlightInput.prototype, "arrivalTime", void 0);
__decorate([
    (0, graphql_1.Field)(),
    (0, class_validator_1.IsNotEmpty)({ message: 'Airline is required' }),
    __metadata("design:type", String)
], CreateFlightInput.prototype, "airline", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int),
    (0, class_validator_1.Min)(0, { message: 'Available seats cannot be negative' }),
    __metadata("design:type", Number)
], CreateFlightInput.prototype, "availableSeats", void 0);
CreateFlightInput = __decorate([
    (0, graphql_1.InputType)()
], CreateFlightInput);
exports.CreateFlightInput = CreateFlightInput;
//# sourceMappingURL=create-flight.input.js.map