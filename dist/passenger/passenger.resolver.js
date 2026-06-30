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
exports.PassengerResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const common_1 = require("@nestjs/common");
const passenger_service_1 = require("./passenger.service");
const passenger_entity_1 = require("./entities/passenger.entity");
const gql_auth_guard_1 = require("../auth/guards/gql-auth.guard");
const roles_guard_1 = require("../auth/guards/roles.guard");
const roles_decorator_1 = require("../auth/decorators/roles.decorator");
const user_entity_1 = require("../auth/entities/user.entity");
const current_user_decorator_1 = require("../auth/decorators/current-user.decorator");
let PassengerResolver = class PassengerResolver {
    constructor(passengerService) {
        this.passengerService = passengerService;
    }
    async getProfile(user) {
        return this.passengerService.findByUserId(user.id);
    }
    findAll() {
        return this.passengerService.findAll();
    }
    findOne(id) {
        return this.passengerService.findOne(id);
    }
};
__decorate([
    (0, graphql_1.Query)(() => passenger_entity_1.Passenger, { name: 'mePassenger' }),
    (0, common_1.UseGuards)(gql_auth_guard_1.GqlAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(user_entity_1.UserRole.PASSENGER),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_entity_1.User]),
    __metadata("design:returntype", Promise)
], PassengerResolver.prototype, "getProfile", null);
__decorate([
    (0, graphql_1.Query)(() => [passenger_entity_1.Passenger], { name: 'passengers' }),
    (0, common_1.UseGuards)(gql_auth_guard_1.GqlAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(user_entity_1.UserRole.ADMIN),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], PassengerResolver.prototype, "findAll", null);
__decorate([
    (0, graphql_1.Query)(() => passenger_entity_1.Passenger, { name: 'passenger' }),
    (0, common_1.UseGuards)(gql_auth_guard_1.GqlAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(user_entity_1.UserRole.ADMIN, user_entity_1.UserRole.STAFF),
    __param(0, (0, graphql_1.Args)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], PassengerResolver.prototype, "findOne", null);
PassengerResolver = __decorate([
    (0, graphql_1.Resolver)(() => passenger_entity_1.Passenger),
    __metadata("design:paramtypes", [passenger_service_1.PassengerService])
], PassengerResolver);
exports.PassengerResolver = PassengerResolver;
//# sourceMappingURL=passenger.resolver.js.map