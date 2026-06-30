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
exports.BaggageService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const baggage_entity_1 = require("./entities/baggage.entity");
const passenger_entity_1 = require("../passenger/entities/passenger.entity");
const flight_entity_1 = require("../flight/entities/flight.entity");
let BaggageService = class BaggageService {
    constructor(baggageRepository, passengerRepository, flightRepository) {
        this.baggageRepository = baggageRepository;
        this.passengerRepository = passengerRepository;
        this.flightRepository = flightRepository;
    }
    async register(input) {
        const { passengerId, flightId, tagNumber, weight } = input;
        const passenger = await this.passengerRepository.findOne({ where: { id: passengerId } });
        if (!passenger) {
            throw new common_1.NotFoundException(`Passenger with ID ${passengerId} not found`);
        }
        const flight = await this.flightRepository.findOne({ where: { id: flightId } });
        if (!flight) {
            throw new common_1.NotFoundException(`Flight with ID ${flightId} not found`);
        }
        const existing = await this.baggageRepository.findOne({ where: { tagNumber } });
        if (existing) {
            throw new common_1.ConflictException(`Baggage with tag number ${tagNumber} is already registered`);
        }
        const baggage = this.baggageRepository.create(input);
        return this.baggageRepository.save(baggage);
    }
    async updateStatus(input) {
        const { id, status } = input;
        const baggage = await this.findOne(id);
        baggage.status = status;
        return this.baggageRepository.save(baggage);
    }
    async findByPassenger(passengerId) {
        return this.baggageRepository.find({
            where: { passengerId },
            relations: ['flight'],
        });
    }
    async findByUserId(userId) {
        const passenger = await this.passengerRepository.findOne({ where: { userId } });
        if (!passenger) {
            throw new common_1.NotFoundException('Passenger profile not found');
        }
        return this.findByPassenger(passenger.id);
    }
    async findAll() {
        return this.baggageRepository.find({ relations: ['passenger', 'flight'] });
    }
    async findOne(id) {
        const baggage = await this.baggageRepository.findOne({
            where: { id },
            relations: ['passenger', 'flight'],
        });
        if (!baggage) {
            throw new common_1.NotFoundException(`Baggage with ID ${id} not found`);
        }
        return baggage;
    }
};
BaggageService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(baggage_entity_1.Baggage)),
    __param(1, (0, typeorm_1.InjectRepository)(passenger_entity_1.Passenger)),
    __param(2, (0, typeorm_1.InjectRepository)(flight_entity_1.Flight)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], BaggageService);
exports.BaggageService = BaggageService;
//# sourceMappingURL=baggage.service.js.map