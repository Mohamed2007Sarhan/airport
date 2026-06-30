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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FlightService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const flight_entity_1 = require("./entities/flight.entity");
const airport_entity_1 = require("../airport/entities/airport.entity");
const booking_entity_1 = require("../booking/entities/booking.entity");
const notification_queue_service_1 = require("../queue/notification-queue.service");
let FlightService = class FlightService {
    constructor(flightRepository, airportRepository, bookingRepository, notificationQueueService) {
        this.flightRepository = flightRepository;
        this.airportRepository = airportRepository;
        this.bookingRepository = bookingRepository;
        this.notificationQueueService = notificationQueueService;
    }
    async create(input) {
        const departure = await this.airportRepository.findOne({ where: { id: input.departureAirportId } });
        if (!departure) {
            throw new common_1.NotFoundException(`Departure airport with ID ${input.departureAirportId} not found`);
        }
        const destination = await this.airportRepository.findOne({ where: { id: input.destinationAirportId } });
        if (!destination) {
            throw new common_1.NotFoundException(`Destination airport with ID ${input.destinationAirportId} not found`);
        }
        if (input.departureAirportId === input.destinationAirportId) {
            throw new common_1.BadRequestException('Departure and destination airports cannot be the same');
        }
        if (new Date(input.arrivalTime) <= new Date(input.departureTime)) {
            throw new common_1.BadRequestException('Arrival time must be after departure time');
        }
        const flight = this.flightRepository.create(input);
        return this.flightRepository.save(flight);
    }
    async findAll(limit = 10, offset = 0, filter) {
        const query = this.flightRepository.createQueryBuilder('flight');
        if (filter) {
            if (filter.airline) {
                query.andWhere('flight.airline ILIKE :airline', { airline: `%${filter.airline}%` });
            }
            if (filter.departureTimeStart) {
                query.andWhere('flight.departureTime >= :start', { start: filter.departureTimeStart });
            }
            if (filter.departureTimeEnd) {
                query.andWhere('flight.departureTime <= :end', { end: filter.departureTimeEnd });
            }
            if (filter.destinationAirportCode) {
                query.innerJoin('flight.destinationAirport', 'dest')
                    .andWhere('dest.code = :code', { code: filter.destinationAirportCode.toUpperCase() });
            }
        }
        query.skip(offset).take(limit).orderBy('flight.departureTime', 'ASC');
        const [items, total] = await query.getManyAndCount();
        return { items, total };
    }
    async findOne(id) {
        const flight = await this.flightRepository.findOne({ where: { id } });
        if (!flight) {
            throw new common_1.NotFoundException(`Flight with ID ${id} not found`);
        }
        return flight;
    }
    async update(input) {
        const { id } = input, data = __rest(input, ["id"]);
        const flight = await this.findOne(id);
        if (data.departureAirportId) {
            const departure = await this.airportRepository.findOne({ where: { id: data.departureAirportId } });
            if (!departure) {
                throw new common_1.NotFoundException(`Departure airport with ID ${data.departureAirportId} not found`);
            }
        }
        if (data.destinationAirportId) {
            const destination = await this.airportRepository.findOne({ where: { id: data.destinationAirportId } });
            if (!destination) {
                throw new common_1.NotFoundException(`Destination airport with ID ${data.destinationAirportId} not found`);
            }
        }
        const newDepId = data.departureAirportId || flight.departureAirportId;
        const newDestId = data.destinationAirportId || flight.destinationAirportId;
        if (newDepId === newDestId) {
            throw new common_1.BadRequestException('Departure and destination airports cannot be the same');
        }
        const newDepTime = data.departureTime ? new Date(data.departureTime) : new Date(flight.departureTime);
        const newArrTime = data.arrivalTime ? new Date(data.arrivalTime) : new Date(flight.arrivalTime);
        if (newArrTime <= newDepTime) {
            throw new common_1.BadRequestException('Arrival time must be after departure time');
        }
        Object.assign(flight, data);
        return this.flightRepository.save(flight);
    }
    async updateStatus(id, status) {
        const flight = await this.findOne(id);
        const oldStatus = flight.status;
        flight.status = status;
        const savedFlight = await this.flightRepository.save(flight);
        if (oldStatus !== status && (status === flight_entity_1.FlightStatus.DELAYED || status === flight_entity_1.FlightStatus.CANCELED)) {
            const bookings = await this.bookingRepository.find({
                where: { flightId: id },
                relations: ['passenger', 'passenger.user'],
            });
            for (const booking of bookings) {
                if (booking.passenger && booking.passenger.user) {
                    await this.notificationQueueService.addFlightStatusAlert(booking.passenger.user.email, booking.passenger.name, flight.flightNumber, status);
                }
            }
        }
        return savedFlight;
    }
    async remove(id) {
        const flight = await this.findOne(id);
        await this.flightRepository.remove(flight);
        return true;
    }
};
FlightService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(flight_entity_1.Flight)),
    __param(1, (0, typeorm_1.InjectRepository)(airport_entity_1.Airport)),
    __param(2, (0, typeorm_1.InjectRepository)(booking_entity_1.Booking)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        notification_queue_service_1.NotificationQueueService])
], FlightService);
exports.FlightService = FlightService;
//# sourceMappingURL=flight.service.js.map