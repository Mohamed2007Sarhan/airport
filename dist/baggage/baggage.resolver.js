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
exports.BaggageResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const common_1 = require("@nestjs/common");
const baggage_service_1 = require("./baggage.service");
const baggage_entity_1 = require("./entities/baggage.entity");
const register_baggage_input_1 = require("./dto/register-baggage.input");
const update_baggage_status_input_1 = require("./dto/update-baggage-status.input");
const passenger_entity_1 = require("../passenger/entities/passenger.entity");
const flight_entity_1 = require("../flight/entities/flight.entity");
const passenger_service_1 = require("../passenger/passenger.service");
const flight_service_1 = require("../flight/flight.service");
const gql_auth_guard_1 = require("../auth/guards/gql-auth.guard");
const roles_guard_1 = require("../auth/guards/roles.guard");
const roles_decorator_1 = require("../auth/decorators/roles.decorator");
const user_entity_1 = require("../auth/entities/user.entity");
const current_user_decorator_1 = require("../auth/decorators/current-user.decorator");
let BaggageResolver = class BaggageResolver {
    constructor(baggageService, passengerService, flightService) {
        this.baggageService = baggageService;
        this.passengerService = passengerService;
        this.flightService = flightService;
    }
    registerBaggage(input) {
        return this.baggageService.register(input);
    }
    updateBaggageStatus(input) {
        return this.baggageService.updateStatus(input);
    }
    findAll() {
        return this.baggageService.findAll();
    }
    myBaggage(user) {
        return this.baggageService.findByUserId(user.id);
    }
    async findOne(user, id) {
        const baggage = await this.baggageService.findOne(id);
        if (user.role === user_entity_1.UserRole.PASSENGER) {
            const passenger = await this.passengerService.findByUserId(user.id);
            if (baggage.passengerId !== passenger.id) {
                throw new common_1.ForbiddenException('You are not authorized to view this baggage');
            }
        }
        return baggage;
    }
    async passenger(baggage) {
        return this.passengerService.findOne(baggage.passengerId);
    }
    async flight(baggage) {
        return this.flightService.findOne(baggage.flightId);
    }
};
__decorate([
    (0, graphql_1.Mutation)(() => baggage_entity_1.Baggage),
    (0, common_1.UseGuards)(gql_auth_guard_1.GqlAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(user_entity_1.UserRole.ADMIN, user_entity_1.UserRole.STAFF),
    __param(0, (0, graphql_1.Args)('input')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [register_baggage_input_1.RegisterBaggageInput]),
    __metadata("design:returntype", Promise)
], BaggageResolver.prototype, "registerBaggage", null);
__decorate([
    (0, graphql_1.Mutation)(() => baggage_entity_1.Baggage),
    (0, common_1.UseGuards)(gql_auth_guard_1.GqlAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(user_entity_1.UserRole.ADMIN, user_entity_1.UserRole.STAFF),
    __param(0, (0, graphql_1.Args)('input')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [update_baggage_status_input_1.UpdateBaggageStatusInput]),
    __metadata("design:returntype", Promise)
], BaggageResolver.prototype, "updateBaggageStatus", null);
__decorate([
    (0, graphql_1.Query)(() => [baggage_entity_1.Baggage], { name: 'baggages' }),
    (0, common_1.UseGuards)(gql_auth_guard_1.GqlAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(user_entity_1.UserRole.ADMIN, user_entity_1.UserRole.STAFF),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], BaggageResolver.prototype, "findAll", null);
__decorate([
    (0, graphql_1.Query)(() => [baggage_entity_1.Baggage], { name: 'myBaggage' }),
    (0, common_1.UseGuards)(gql_auth_guard_1.GqlAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(user_entity_1.UserRole.PASSENGER),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_entity_1.User]),
    __metadata("design:returntype", Promise)
], BaggageResolver.prototype, "myBaggage", null);
__decorate([
    (0, graphql_1.Query)(() => baggage_entity_1.Baggage, { name: 'baggage' }),
    (0, common_1.UseGuards)(gql_auth_guard_1.GqlAuthGuard),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, graphql_1.Args)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_entity_1.User, String]),
    __metadata("design:returntype", Promise)
], BaggageResolver.prototype, "findOne", null);
__decorate([
    (0, graphql_1.ResolveField)(() => passenger_entity_1.Passenger),
    __param(0, (0, graphql_1.Parent)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [baggage_entity_1.Baggage]),
    __metadata("design:returntype", Promise)
], BaggageResolver.prototype, "passenger", null);
__decorate([
    (0, graphql_1.ResolveField)(() => flight_entity_1.Flight),
    __param(0, (0, graphql_1.Parent)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [baggage_entity_1.Baggage]),
    __metadata("design:returntype", Promise)
], BaggageResolver.prototype, "flight", null);
BaggageResolver = __decorate([
    (0, graphql_1.Resolver)(() => baggage_entity_1.Baggage),
    __metadata("design:paramtypes", [baggage_service_1.BaggageService,
        passenger_service_1.PassengerService,
        flight_service_1.FlightService])
], BaggageResolver);
exports.BaggageResolver = BaggageResolver;
//# sourceMappingURL=baggage.resolver.js.map