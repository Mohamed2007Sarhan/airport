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
exports.FlightSubscriptionResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const common_1 = require("@nestjs/common");
const flight_entity_1 = require("./entities/flight.entity");
const flight_resolver_1 = require("./flight.resolver");
const gql_auth_guard_1 = require("../auth/guards/gql-auth.guard");
let FlightSubscriptionResolver = class FlightSubscriptionResolver {
    flightStatusUpdated(flightId) {
        return flight_resolver_1.pubSub.asyncIterator('flightStatusUpdated');
    }
};
__decorate([
    (0, graphql_1.Subscription)(() => flight_entity_1.Flight, {
        filter: (payload, variables) => {
            return payload.flightStatusUpdated.id === variables.flightId;
        },
        resolve: (payload) => payload.flightStatusUpdated,
    }),
    (0, common_1.UseGuards)(gql_auth_guard_1.GqlAuthGuard),
    __param(0, (0, graphql_1.Args)('flightId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], FlightSubscriptionResolver.prototype, "flightStatusUpdated", null);
FlightSubscriptionResolver = __decorate([
    (0, graphql_1.Resolver)(() => flight_entity_1.Flight)
], FlightSubscriptionResolver);
exports.FlightSubscriptionResolver = FlightSubscriptionResolver;
//# sourceMappingURL=flight.subscription.resolver.js.map