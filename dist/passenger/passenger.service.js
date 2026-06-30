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
exports.PassengerService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const passenger_entity_1 = require("./entities/passenger.entity");
let PassengerService = class PassengerService {
    constructor(passengerRepository) {
        this.passengerRepository = passengerRepository;
    }
    async findByUserId(userId) {
        const passenger = await this.passengerRepository.findOne({ where: { userId } });
        if (!passenger) {
            throw new common_1.NotFoundException(`Passenger profile not found for user ID ${userId}`);
        }
        return passenger;
    }
    async findAll() {
        return this.passengerRepository.find({ relations: ['user'] });
    }
    async findOne(id) {
        const passenger = await this.passengerRepository.findOne({
            where: { id },
            relations: ['user'],
        });
        if (!passenger) {
            throw new common_1.NotFoundException(`Passenger with ID ${id} not found`);
        }
        return passenger;
    }
};
PassengerService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(passenger_entity_1.Passenger)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], PassengerService);
exports.PassengerService = PassengerService;
//# sourceMappingURL=passenger.service.js.map