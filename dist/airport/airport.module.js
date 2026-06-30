"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AirportModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const airport_entity_1 = require("./entities/airport.entity");
const airport_service_1 = require("./airport.service");
const airport_resolver_1 = require("./airport.resolver");
const airport_loader_1 = require("./airport.loader");
const auth_module_1 = require("../auth/auth.module");
let AirportModule = class AirportModule {
};
AirportModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([airport_entity_1.Airport]),
            auth_module_1.AuthModule,
        ],
        providers: [airport_service_1.AirportService, airport_resolver_1.AirportResolver, airport_loader_1.AirportLoader],
        exports: [airport_service_1.AirportService, typeorm_1.TypeOrmModule, airport_loader_1.AirportLoader],
    })
], AirportModule);
exports.AirportModule = AirportModule;
//# sourceMappingURL=airport.module.js.map