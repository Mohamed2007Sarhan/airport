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
exports.StaffService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const bcrypt = require("bcrypt");
const staff_entity_1 = require("./entities/staff.entity");
const user_entity_1 = require("../auth/entities/user.entity");
const flight_entity_1 = require("../flight/entities/flight.entity");
let StaffService = class StaffService {
    constructor(staffRepository, userRepository, flightRepository, connection) {
        this.staffRepository = staffRepository;
        this.userRepository = userRepository;
        this.flightRepository = flightRepository;
        this.connection = connection;
    }
    async create(input) {
        const { email, password, name, employeeId, role } = input;
        const existingUser = await this.userRepository.findOne({ where: { email } });
        if (existingUser) {
            throw new common_1.ConflictException('Email address already registered');
        }
        const passwordHash = await bcrypt.hash(password, 10);
        return this.connection.transaction(async (entityManager) => {
            const user = new user_entity_1.User();
            user.email = email;
            user.password = passwordHash;
            user.role = user_entity_1.UserRole.STAFF;
            const savedUser = await entityManager.save(user);
            const existingStaff = await entityManager.findOne(staff_entity_1.Staff, { where: { employeeId } });
            if (existingStaff) {
                throw new common_1.ConflictException('Employee ID already registered');
            }
            const staff = new staff_entity_1.Staff();
            staff.userId = savedUser.id;
            staff.name = name;
            staff.employeeId = employeeId;
            staff.role = role;
            return entityManager.save(staff);
        });
    }
    async assignToFlight(staffId, flightId) {
        const staff = await this.staffRepository.findOne({ where: { id: staffId } });
        if (!staff) {
            throw new common_1.NotFoundException(`Staff member with ID ${staffId} not found`);
        }
        if (flightId) {
            const flight = await this.flightRepository.findOne({ where: { id: flightId } });
            if (!flight) {
                throw new common_1.NotFoundException(`Flight with ID ${flightId} not found`);
            }
            staff.assignedFlightId = flightId;
        }
        else {
            staff.assignedFlightId = null;
        }
        return this.staffRepository.save(staff);
    }
    async findAll() {
        return this.staffRepository.find({ relations: ['user', 'assignedFlight'] });
    }
    async findOne(id) {
        const staff = await this.staffRepository.findOne({
            where: { id },
            relations: ['user', 'assignedFlight'],
        });
        if (!staff) {
            throw new common_1.NotFoundException(`Staff member with ID ${id} not found`);
        }
        return staff;
    }
    async findByUserId(userId) {
        const staff = await this.staffRepository.findOne({
            where: { userId },
            relations: ['assignedFlight'],
        });
        if (!staff) {
            throw new common_1.NotFoundException(`Staff profile not found for user ID ${userId}`);
        }
        return staff;
    }
    async remove(id) {
        const staff = await this.findOne(id);
        return this.connection.transaction(async (entityManager) => {
            await entityManager.remove(staff);
            const user = await entityManager.findOne(user_entity_1.User, { where: { id: staff.userId } });
            if (user) {
                await entityManager.remove(user);
            }
            return true;
        });
    }
};
StaffService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(staff_entity_1.Staff)),
    __param(1, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __param(2, (0, typeorm_1.InjectRepository)(flight_entity_1.Flight)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Connection])
], StaffService);
exports.StaffService = StaffService;
//# sourceMappingURL=staff.service.js.map