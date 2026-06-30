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
exports.BookingResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const common_1 = require("@nestjs/common");
const booking_service_1 = require("./booking.service");
const booking_entity_1 = require("./entities/booking.entity");
const passenger_entity_1 = require("../passenger/entities/passenger.entity");
const flight_entity_1 = require("../flight/entities/flight.entity");
const passenger_service_1 = require("../passenger/passenger.service");
const flight_service_1 = require("../flight/flight.service");
const gql_auth_guard_1 = require("../auth/guards/gql-auth.guard");
const roles_guard_1 = require("../auth/guards/roles.guard");
const roles_decorator_1 = require("../auth/decorators/roles.decorator");
const user_entity_1 = require("../auth/entities/user.entity");
const current_user_decorator_1 = require("../auth/decorators/current-user.decorator");
let BookingResolver = class BookingResolver {
    constructor(bookingService, passengerService, flightService) {
        this.bookingService = bookingService;
        this.passengerService = passengerService;
        this.flightService = flightService;
    }
    async bookFlight(user, flightId, seatNumber) {
        return this.bookingService.bookFlight(user.id, flightId, seatNumber);
    }
    async myBookings(user) {
        return this.bookingService.findPassengerBookings(user.id);
    }
    async flightBookings(flightId) {
        return this.bookingService.findFlightBookings(flightId);
    }
    async findOne(user, id) {
        const booking = await this.bookingService.findOne(id);
        if (user.role === user_entity_1.UserRole.PASSENGER) {
            const passenger = await this.passengerService.findByUserId(user.id);
            if (booking.passengerId !== passenger.id) {
                throw new common_1.ForbiddenException('You are not authorized to view this booking');
            }
        }
        return booking;
    }
    async passenger(booking) {
        return this.passengerService.findOne(booking.passengerId);
    }
    async flight(booking) {
        return this.flightService.findOne(booking.flightId);
    }
};
__decorate([
    (0, graphql_1.Mutation)(() => booking_entity_1.Booking),
    (0, common_1.UseGuards)(gql_auth_guard_1.GqlAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(user_entity_1.UserRole.PASSENGER),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, graphql_1.Args)('flightId')),
    __param(2, (0, graphql_1.Args)('seatNumber')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_entity_1.User, String, String]),
    __metadata("design:returntype", Promise)
], BookingResolver.prototype, "bookFlight", null);
__decorate([
    (0, graphql_1.Query)(() => [booking_entity_1.Booking], { name: 'myBookings' }),
    (0, common_1.UseGuards)(gql_auth_guard_1.GqlAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(user_entity_1.UserRole.PASSENGER),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_entity_1.User]),
    __metadata("design:returntype", Promise)
], BookingResolver.prototype, "myBookings", null);
__decorate([
    (0, graphql_1.Query)(() => [booking_entity_1.Booking], { name: 'flightBookings' }),
    (0, common_1.UseGuards)(gql_auth_guard_1.GqlAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(user_entity_1.UserRole.ADMIN, user_entity_1.UserRole.STAFF),
    __param(0, (0, graphql_1.Args)('flightId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], BookingResolver.prototype, "flightBookings", null);
__decorate([
    (0, graphql_1.Query)(() => booking_entity_1.Booking, { name: 'booking' }),
    (0, common_1.UseGuards)(gql_auth_guard_1.GqlAuthGuard),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, graphql_1.Args)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_entity_1.User, String]),
    __metadata("design:returntype", Promise)
], BookingResolver.prototype, "findOne", null);
__decorate([
    (0, graphql_1.ResolveField)(() => passenger_entity_1.Passenger),
    __param(0, (0, graphql_1.Parent)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [booking_entity_1.Booking]),
    __metadata("design:returntype", Promise)
], BookingResolver.prototype, "passenger", null);
__decorate([
    (0, graphql_1.ResolveField)(() => flight_entity_1.Flight),
    __param(0, (0, graphql_1.Parent)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [booking_entity_1.Booking]),
    __metadata("design:returntype", Promise)
], BookingResolver.prototype, "flight", null);
BookingResolver = __decorate([
    (0, graphql_1.Resolver)(() => booking_entity_1.Booking),
    __metadata("design:paramtypes", [booking_service_1.BookingService,
        passenger_service_1.PassengerService,
        flight_service_1.FlightService])
], BookingResolver);
exports.BookingResolver = BookingResolver;
//# sourceMappingURL=booking.resolver.js.map