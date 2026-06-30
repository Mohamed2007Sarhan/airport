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
exports.FlightResolver = exports.pubSub = void 0;
const graphql_1 = require("@nestjs/graphql");
const common_1 = require("@nestjs/common");
const graphql_subscriptions_1 = require("graphql-subscriptions");
const flight_service_1 = require("./flight.service");
const flight_entity_1 = require("./entities/flight.entity");
const airport_entity_1 = require("../airport/entities/airport.entity");
const airport_loader_1 = require("../airport/airport.loader");
const create_flight_input_1 = require("./dto/create-flight.input");
const update_flight_input_1 = require("./dto/update-flight.input");
const flight_filter_input_1 = require("./dto/flight-filter.input");
const flights_response_type_1 = require("./dto/flights-response.type");
const gql_auth_guard_1 = require("../auth/guards/gql-auth.guard");
const roles_guard_1 = require("../auth/guards/roles.guard");
const roles_decorator_1 = require("../auth/decorators/roles.decorator");
const user_entity_1 = require("../auth/entities/user.entity");
exports.pubSub = new graphql_subscriptions_1.PubSub();
let FlightResolver = class FlightResolver {
    constructor(flightService, airportLoader) {
        this.flightService = flightService;
        this.airportLoader = airportLoader;
    }
    createFlight(input) {
        return this.flightService.create(input);
    }
    findAll(limit, offset, filter) {
        return this.flightService.findAll(limit, offset, filter);
    }
    findOne(id) {
        return this.flightService.findOne(id);
    }
    updateFlight(input) {
        return this.flightService.update(input);
    }
    async updateFlightStatus(id, status) {
        const updatedFlight = await this.flightService.updateStatus(id, status);
        exports.pubSub.publish('flightStatusUpdated', { flightStatusUpdated: updatedFlight });
        return updatedFlight;
    }
    removeFlight(id) {
        return this.flightService.remove(id);
    }
    async departureAirport(flight) {
        return this.airportLoader.loader.load(flight.departureAirportId);
    }
    async destinationAirport(flight) {
        return this.airportLoader.loader.load(flight.destinationAirportId);
    }
};
__decorate([
    (0, graphql_1.Mutation)(() => flight_entity_1.Flight),
    (0, common_1.UseGuards)(gql_auth_guard_1.GqlAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(user_entity_1.UserRole.ADMIN),
    __param(0, (0, graphql_1.Args)('input')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_flight_input_1.CreateFlightInput]),
    __metadata("design:returntype", Promise)
], FlightResolver.prototype, "createFlight", null);
__decorate([
    (0, graphql_1.Query)(() => flights_response_type_1.FlightsResponse, { name: 'flights' }),
    (0, common_1.UseGuards)(gql_auth_guard_1.GqlAuthGuard),
    __param(0, (0, graphql_1.Args)('limit', { type: () => Number, defaultValue: 10 })),
    __param(1, (0, graphql_1.Args)('offset', { type: () => Number, defaultValue: 0 })),
    __param(2, (0, graphql_1.Args)('filter', { nullable: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, flight_filter_input_1.FlightFilterInput]),
    __metadata("design:returntype", Promise)
], FlightResolver.prototype, "findAll", null);
__decorate([
    (0, graphql_1.Query)(() => flight_entity_1.Flight, { name: 'flight' }),
    (0, common_1.UseGuards)(gql_auth_guard_1.GqlAuthGuard),
    __param(0, (0, graphql_1.Args)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], FlightResolver.prototype, "findOne", null);
__decorate([
    (0, graphql_1.Mutation)(() => flight_entity_1.Flight),
    (0, common_1.UseGuards)(gql_auth_guard_1.GqlAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(user_entity_1.UserRole.ADMIN),
    __param(0, (0, graphql_1.Args)('input')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [update_flight_input_1.UpdateFlightInput]),
    __metadata("design:returntype", Promise)
], FlightResolver.prototype, "updateFlight", null);
__decorate([
    (0, graphql_1.Mutation)(() => flight_entity_1.Flight),
    (0, common_1.UseGuards)(gql_auth_guard_1.GqlAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(user_entity_1.UserRole.ADMIN, user_entity_1.UserRole.STAFF),
    __param(0, (0, graphql_1.Args)('id')),
    __param(1, (0, graphql_1.Args)('status', { type: () => flight_entity_1.FlightStatus })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], FlightResolver.prototype, "updateFlightStatus", null);
__decorate([
    (0, graphql_1.Mutation)(() => Boolean),
    (0, common_1.UseGuards)(gql_auth_guard_1.GqlAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(user_entity_1.UserRole.ADMIN),
    __param(0, (0, graphql_1.Args)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], FlightResolver.prototype, "removeFlight", null);
__decorate([
    (0, graphql_1.ResolveField)(() => airport_entity_1.Airport),
    __param(0, (0, graphql_1.Parent)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [flight_entity_1.Flight]),
    __metadata("design:returntype", Promise)
], FlightResolver.prototype, "departureAirport", null);
__decorate([
    (0, graphql_1.ResolveField)(() => airport_entity_1.Airport),
    __param(0, (0, graphql_1.Parent)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [flight_entity_1.Flight]),
    __metadata("design:returntype", Promise)
], FlightResolver.prototype, "destinationAirport", null);
FlightResolver = __decorate([
    (0, graphql_1.Resolver)(() => flight_entity_1.Flight),
    __metadata("design:paramtypes", [flight_service_1.FlightService,
        airport_loader_1.AirportLoader])
], FlightResolver);
exports.FlightResolver = FlightResolver;
//# sourceMappingURL=flight.resolver.js.map