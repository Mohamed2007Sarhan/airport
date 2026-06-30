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
exports.CreateAirportInput = void 0;
const graphql_1 = require("@nestjs/graphql");
const class_validator_1 = require("class-validator");
let CreateAirportInput = class CreateAirportInput {
};
__decorate([
    (0, graphql_1.Field)(),
    (0, class_validator_1.Length)(3, 10, { message: 'Airport code must be between 3 and 10 characters' }),
    __metadata("design:type", String)
], CreateAirportInput.prototype, "code", void 0);
__decorate([
    (0, graphql_1.Field)(),
    (0, class_validator_1.IsNotEmpty)({ message: 'Airport name is required' }),
    __metadata("design:type", String)
], CreateAirportInput.prototype, "name", void 0);
__decorate([
    (0, graphql_1.Field)(),
    (0, class_validator_1.IsNotEmpty)({ message: 'City is required' }),
    __metadata("design:type", String)
], CreateAirportInput.prototype, "city", void 0);
__decorate([
    (0, graphql_1.Field)(),
    (0, class_validator_1.IsNotEmpty)({ message: 'Country is required' }),
    __metadata("design:type", String)
], CreateAirportInput.prototype, "country", void 0);
CreateAirportInput = __decorate([
    (0, graphql_1.InputType)()
], CreateAirportInput);
exports.CreateAirportInput = CreateAirportInput;
//# sourceMappingURL=create-airport.input.js.map