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
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const jwt_1 = require("@nestjs/jwt");
const bcrypt = require("bcrypt");
const user_entity_1 = require("./entities/user.entity");
const passenger_entity_1 = require("../passenger/entities/passenger.entity");
let AuthService = class AuthService {
    constructor(userRepository, connection, jwtService) {
        this.userRepository = userRepository;
        this.connection = connection;
        this.jwtService = jwtService;
    }
    async registerPassenger(input) {
        const { email, password, name, passportNumber, nationality } = input;
        const existingUser = await this.userRepository.findOne({ where: { email } });
        if (existingUser) {
            throw new common_1.ConflictException('Email address already registered');
        }
        const passwordHash = await bcrypt.hash(password, 10);
        return this.connection.transaction(async (entityManager) => {
            const user = new user_entity_1.User();
            user.email = email;
            user.password = passwordHash;
            user.role = user_entity_1.UserRole.PASSENGER;
            const savedUser = await entityManager.save(user);
            const existingPassenger = await entityManager.findOne(passenger_entity_1.Passenger, { where: { passportNumber } });
            if (existingPassenger) {
                throw new common_1.ConflictException('Passport number already registered');
            }
            const passenger = new passenger_entity_1.Passenger();
            passenger.userId = savedUser.id;
            passenger.name = name;
            passenger.passportNumber = passportNumber;
            passenger.nationality = nationality;
            await entityManager.save(passenger);
            const token = this.generateToken(savedUser);
            return {
                token,
                user: savedUser,
            };
        });
    }
    async login(input) {
        const { email, password } = input;
        const user = await this.userRepository.findOne({ where: { email } });
        if (!user) {
            throw new common_1.UnauthorizedException('Invalid email or password');
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            throw new common_1.UnauthorizedException('Invalid email or password');
        }
        const token = this.generateToken(user);
        return {
            token,
            user,
        };
    }
    async createAdmin(email, password) {
        const existing = await this.userRepository.findOne({ where: { email } });
        if (existing) {
            return existing;
        }
        const user = new user_entity_1.User();
        user.email = email;
        user.password = await bcrypt.hash(password, 10);
        user.role = user_entity_1.UserRole.ADMIN;
        return this.userRepository.save(user);
    }
    generateToken(user) {
        const payload = { email: user.email, sub: user.id, role: user.role };
        return this.jwtService.sign(payload);
    }
};
AuthService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Connection,
        jwt_1.JwtService])
], AuthService);
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map