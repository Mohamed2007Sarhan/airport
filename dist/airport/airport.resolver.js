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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AirportResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const common_1 = require("@nestjs/common");
const airport_service_1 = require("./airport.service");
const airport_entity_1 = require("./entities/airport.entity");
const create_airport_input_1 = require("./dto/create-airport.input");
const update_airport_input_1 = require("./dto/update-airport.input");
const gql_auth_guard_1 = require("../auth/guards/gql-auth.guard");
const roles_guard_1 = require("../auth/guards/roles.guard");
const roles_decorator_1 = require("../auth/decorators/roles.decorator");
const user_entity_1 = require("../auth/entities/user.entity");
let AirportResolver = class AirportResolver {
    constructor(airportService) {
        this.airportService = airportService;
    }
    createAirport(input) {
        return this.airportService.create(input);
    }
    findAll() {
        return this.airportService.findAll();
    }
    findOne(id) {
        return this.airportService.findOne(id);
    }
    updateAirport(input) {
        return this.airportService.update(input);
    }
    removeAirport(id) {
        return this.airportService.remove(id);
    }
};
__decorate([
    (0, graphql_1.Mutation)(() => airport_entity_1.Airport),
    (0, common_1.UseGuards)(gql_auth_guard_1.GqlAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(user_entity_1.UserRole.ADMIN),
    __param(0, (0, graphql_1.Args)('input')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_airport_input_1.CreateAirportInput]),
    __metadata("design:returntype", Promise)
], AirportResolver.prototype, "createAirport", null);
__decorate([
    (0, graphql_1.Query)(() => [airport_entity_1.Airport], { name: 'airports' }),
    (0, common_1.UseGuards)(gql_auth_guard_1.GqlAuthGuard),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AirportResolver.prototype, "findAll", null);
__decorate([
    (0, graphql_1.Query)(() => airport_entity_1.Airport, { name: 'airport' }),
    (0, common_1.UseGuards)(gql_auth_guard_1.GqlAuthGuard),
    __param(0, (0, graphql_1.Args)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AirportResolver.prototype, "findOne", null);
__decorate([
    (0, graphql_1.Mutation)(() => airport_entity_1.Airport),
    (0, common_1.UseGuards)(gql_auth_guard_1.GqlAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(user_entity_1.UserRole.ADMIN),
    __param(0, (0, graphql_1.Args)('input')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [update_airport_input_1.UpdateAirportInput]),
    __metadata("design:returntype", Promise)
], AirportResolver.prototype, "updateAirport", null);
__decorate([
    (0, graphql_1.Mutation)(() => Boolean),
    (0, common_1.UseGuards)(gql_auth_guard_1.GqlAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(user_entity_1.UserRole.ADMIN),
    __param(0, (0, graphql_1.Args)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AirportResolver.prototype, "removeAirport", null);
AirportResolver = __decorate([
    (0, graphql_1.Resolver)(() => airport_entity_1.Airport),
    __metadata("design:paramtypes", [airport_service_1.AirportService])
], AirportResolver);
exports.AirportResolver = AirportResolver;
//# sourceMappingURL=airport.resolver.js.map