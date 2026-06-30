"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaggageModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const baggage_entity_1 = require("./entities/baggage.entity");
const baggage_service_1 = require("./baggage.service");
const baggage_resolver_1 = require("./baggage.resolver");
const passenger_module_1 = require("../passenger/passenger.module");
const flight_module_1 = require("../flight/flight.module");
const auth_module_1 = require("../auth/auth.module");
let BaggageModule = class BaggageModule {
};
BaggageModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([baggage_entity_1.Baggage]),
            passenger_module_1.PassengerModule,
            flight_module_1.FlightModule,
            auth_module_1.AuthModule,
        ],
        providers: [baggage_service_1.BaggageService, baggage_resolver_1.BaggageResolver],
        exports: [baggage_service_1.BaggageService],
    })
], BaggageModule);
exports.BaggageModule = BaggageModule;
//# sourceMappingURL=baggage.module.js.map