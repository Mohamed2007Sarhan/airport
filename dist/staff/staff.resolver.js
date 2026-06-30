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
exports.StaffResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const common_1 = require("@nestjs/common");
const staff_service_1 = require("./staff.service");
const staff_entity_1 = require("./entities/staff.entity");
const create_staff_input_1 = require("./dto/create-staff.input");
const gql_auth_guard_1 = require("../auth/guards/gql-auth.guard");
const roles_guard_1 = require("../auth/guards/roles.guard");
const roles_decorator_1 = require("../auth/decorators/roles.decorator");
const user_entity_1 = require("../auth/entities/user.entity");
const current_user_decorator_1 = require("../auth/decorators/current-user.decorator");
let StaffResolver = class StaffResolver {
    constructor(staffService) {
        this.staffService = staffService;
    }
    createStaff(input) {
        return this.staffService.create(input);
    }
    assignStaffToFlight(staffId, flightId) {
        return this.staffService.assignToFlight(staffId, flightId || null);
    }
    findAll() {
        return this.staffService.findAll();
    }
    findOne(id) {
        return this.staffService.findOne(id);
    }
    getProfile(user) {
        return this.staffService.findByUserId(user.id);
    }
    removeStaff(id) {
        return this.staffService.remove(id);
    }
};
__decorate([
    (0, graphql_1.Mutation)(() => staff_entity_1.Staff),
    (0, common_1.UseGuards)(gql_auth_guard_1.GqlAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(user_entity_1.UserRole.ADMIN),
    __param(0, (0, graphql_1.Args)('input')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_staff_input_1.CreateStaffInput]),
    __metadata("design:returntype", Promise)
], StaffResolver.prototype, "createStaff", null);
__decorate([
    (0, graphql_1.Mutation)(() => staff_entity_1.Staff),
    (0, common_1.UseGuards)(gql_auth_guard_1.GqlAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(user_entity_1.UserRole.ADMIN),
    __param(0, (0, graphql_1.Args)('staffId')),
    __param(1, (0, graphql_1.Args)('flightId', { nullable: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], StaffResolver.prototype, "assignStaffToFlight", null);
__decorate([
    (0, graphql_1.Query)(() => [staff_entity_1.Staff], { name: 'staffMembers' }),
    (0, common_1.UseGuards)(gql_auth_guard_1.GqlAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(user_entity_1.UserRole.ADMIN),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], StaffResolver.prototype, "findAll", null);
__decorate([
    (0, graphql_1.Query)(() => staff_entity_1.Staff, { name: 'staffMember' }),
    (0, common_1.UseGuards)(gql_auth_guard_1.GqlAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(user_entity_1.UserRole.ADMIN, user_entity_1.UserRole.STAFF),
    __param(0, (0, graphql_1.Args)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], StaffResolver.prototype, "findOne", null);
__decorate([
    (0, graphql_1.Query)(() => staff_entity_1.Staff, { name: 'meStaff' }),
    (0, common_1.UseGuards)(gql_auth_guard_1.GqlAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(user_entity_1.UserRole.STAFF),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_entity_1.User]),
    __metadata("design:returntype", Promise)
], StaffResolver.prototype, "getProfile", null);
__decorate([
    (0, graphql_1.Mutation)(() => Boolean),
    (0, common_1.UseGuards)(gql_auth_guard_1.GqlAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(user_entity_1.UserRole.ADMIN),
    __param(0, (0, graphql_1.Args)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], StaffResolver.prototype, "removeStaff", null);
StaffResolver = __decorate([
    (0, graphql_1.Resolver)(() => staff_entity_1.Staff),
    __metadata("design:paramtypes", [staff_service_1.StaffService])
], StaffResolver);
exports.StaffResolver = StaffResolver;
//# sourceMappingURL=staff.resolver.js.map