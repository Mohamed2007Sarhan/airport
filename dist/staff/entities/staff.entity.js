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
exports.Staff = exports.StaffRole = void 0;
const typeorm_1 = require("typeorm");
const graphql_1 = require("@nestjs/graphql");
const user_entity_1 = require("../../auth/entities/user.entity");
const flight_entity_1 = require("../../flight/entities/flight.entity");
var StaffRole;
(function (StaffRole) {
    StaffRole["PILOT"] = "PILOT";
    StaffRole["CREW"] = "CREW";
    StaffRole["GROUND_STAFF"] = "GROUND_STAFF";
    StaffRole["SECURITY"] = "SECURITY";
})(StaffRole = exports.StaffRole || (exports.StaffRole = {}));
(0, graphql_1.registerEnumType)(StaffRole, {
    name: 'StaffRole',
});
let Staff = class Staff {
};
__decorate([
    (0, graphql_1.Field)(() => graphql_1.ID),
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], Staff.prototype, "id", void 0);
__decorate([
    (0, graphql_1.Field)(() => user_entity_1.User),
    (0, typeorm_1.OneToOne)(() => user_entity_1.User, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'userId' }),
    __metadata("design:type", user_entity_1.User)
], Staff.prototype, "user", void 0);
__decorate([
    (0, graphql_1.Field)(),
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Staff.prototype, "userId", void 0);
__decorate([
    (0, graphql_1.Field)(),
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Staff.prototype, "name", void 0);
__decorate([
    (0, graphql_1.Field)(),
    (0, typeorm_1.Column)({ unique: true }),
    __metadata("design:type", String)
], Staff.prototype, "employeeId", void 0);
__decorate([
    (0, graphql_1.Field)(() => StaffRole),
    (0, typeorm_1.Column)({
        type: 'varchar',
        length: 50,
    }),
    __metadata("design:type", String)
], Staff.prototype, "role", void 0);
__decorate([
    (0, graphql_1.Field)(() => flight_entity_1.Flight, { nullable: true }),
    (0, typeorm_1.ManyToOne)(() => flight_entity_1.Flight, { onDelete: 'SET NULL', nullable: true }),
    (0, typeorm_1.JoinColumn)({ name: 'assignedFlightId' }),
    __metadata("design:type", flight_entity_1.Flight)
], Staff.prototype, "assignedFlight", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Staff.prototype, "assignedFlightId", void 0);
Staff = __decorate([
    (0, graphql_1.ObjectType)(),
    (0, typeorm_1.Entity)('staff')
], Staff);
exports.Staff = Staff;
//# sourceMappingURL=staff.entity.js.map