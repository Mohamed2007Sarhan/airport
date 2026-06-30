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
exports.BookingService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const booking_entity_1 = require("./entities/booking.entity");
const flight_entity_1 = require("../flight/entities/flight.entity");
const passenger_entity_1 = require("../passenger/entities/passenger.entity");
const notification_queue_service_1 = require("../queue/notification-queue.service");
let BookingService = class BookingService {
    constructor(bookingRepository, flightRepository, passengerRepository, connection, notificationQueueService) {
        this.bookingRepository = bookingRepository;
        this.flightRepository = flightRepository;
        this.passengerRepository = passengerRepository;
        this.connection = connection;
        this.notificationQueueService = notificationQueueService;
    }
    async bookFlight(userId, flightId, seatNumber) {
        const passenger = await this.passengerRepository.findOne({
            where: { userId },
            relations: ['user'],
        });
        if (!passenger) {
            throw new common_1.NotFoundException(`Passenger profile not found for user ${userId}`);
        }
        return this.connection.transaction(async (entityManager) => {
            const flight = await entityManager.findOne(flight_entity_1.Flight, flightId, {
                lock: { mode: 'pessimistic_write' },
            });
            if (!flight) {
                throw new common_1.NotFoundException(`Flight with ID ${flightId} not found`);
            }
            if (flight.availableSeats <= 0) {
                throw new common_1.BadRequestException('No seats available on this flight');
            }
            const existingSeatBooking = await entityManager.findOne(booking_entity_1.Booking, {
                where: { flightId, seatNumber },
            });
            if (existingSeatBooking) {
                throw new common_1.ConflictException(`Seat ${seatNumber} is already taken on flight ${flight.flightNumber}`);
            }
            const booking = new booking_entity_1.Booking();
            booking.passengerId = passenger.id;
            booking.flightId = flightId;
            booking.seatNumber = seatNumber;
            const savedBooking = await entityManager.save(booking);
            flight.availableSeats -= 1;
            await entityManager.save(flight);
            await this.notificationQueueService.addBookingConfirmation(passenger.user.email, passenger.name, flight.flightNumber, seatNumber);
            return savedBooking;
        });
    }
    async findPassengerBookings(userId) {
        const passenger = await this.passengerRepository.findOne({ where: { userId } });
        if (!passenger) {
            throw new common_1.NotFoundException(`Passenger profile not found`);
        }
        return this.bookingRepository.find({
            where: { passengerId: passenger.id },
            relations: ['flight'],
        });
    }
    async findFlightBookings(flightId) {
        return this.bookingRepository.find({
            where: { flightId },
            relations: ['passenger'],
        });
    }
    async findOne(id) {
        const booking = await this.bookingRepository.findOne({
            where: { id },
            relations: ['passenger', 'flight'],
        });
        if (!booking) {
            throw new common_1.NotFoundException(`Booking with ID ${id} not found`);
        }
        return booking;
    }
};
BookingService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(booking_entity_1.Booking)),
    __param(1, (0, typeorm_1.InjectRepository)(flight_entity_1.Flight)),
    __param(2, (0, typeorm_1.InjectRepository)(passenger_entity_1.Passenger)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Connection,
        notification_queue_service_1.NotificationQueueService])
], BookingService);
exports.BookingService = BookingService;
//# sourceMappingURL=booking.service.js.map