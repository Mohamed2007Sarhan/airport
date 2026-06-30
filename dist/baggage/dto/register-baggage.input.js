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
exports.RegisterBaggageInput = void 0;
const graphql_1 = require("@nestjs/graphql");
const class_validator_1 = require("class-validator");
let RegisterBaggageInput = class RegisterBaggageInput {
};
__decorate([
    (0, graphql_1.Field)(),
    (0, class_validator_1.IsUUID)('4', { message: 'Invalid passenger ID' }),
    __metadata("design:type", String)
], RegisterBaggageInput.prototype, "passengerId", void 0);
__decorate([
    (0, graphql_1.Field)(),
    (0, class_validator_1.IsUUID)('4', { message: 'Invalid flight ID' }),
    __metadata("design:type", String)
], RegisterBaggageInput.prototype, "flightId", void 0);
__decorate([
    (0, graphql_1.Field)(),
    (0, class_validator_1.IsNotEmpty)({ message: 'Baggage tag number is required' }),
    __metadata("design:type", String)
], RegisterBaggageInput.prototype, "tagNumber", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Float),
    (0, class_validator_1.Min)(0.1, { message: 'Baggage weight must be greater than 0' }),
    __metadata("design:type", Number)
], RegisterBaggageInput.prototype, "weight", void 0);
RegisterBaggageInput = __decorate([
    (0, graphql_1.InputType)()
], RegisterBaggageInput);
exports.RegisterBaggageInput = RegisterBaggageInput;
//# sourceMappingURL=register-baggage.input.js.map