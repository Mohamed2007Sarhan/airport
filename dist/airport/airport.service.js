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
exports.AirportService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const airport_entity_1 = require("./entities/airport.entity");
let AirportService = class AirportService {
    constructor(airportRepository) {
        this.airportRepository = airportRepository;
    }
    async create(input) {
        const code = input.code.toUpperCase();
        const existing = await this.airportRepository.findOne({ where: { code } });
        if (existing) {
            throw new common_1.ConflictException(`Airport with code ${code} already exists`);
        }
        const airport = this.airportRepository.create(Object.assign(Object.assign({}, input), { code }));
        return this.airportRepository.save(airport);
    }
    async findAll() {
        return this.airportRepository.find();
    }
    async findOne(id) {
        const airport = await this.airportRepository.findOne({ where: { id } });
        if (!airport) {
            throw new common_1.NotFoundException(`Airport with ID ${id} not found`);
        }
        return airport;
    }
    async update(input) {
        const { id } = input, data = __rest(input, ["id"]);
        const airport = await this.findOne(id);
        if (data.code) {
            data.code = data.code.toUpperCase();
            if (data.code !== airport.code) {
                const existing = await this.airportRepository.findOne({ where: { code: data.code } });
                if (existing) {
                    throw new common_1.ConflictException(`Airport with code ${data.code} already exists`);
                }
            }
        }
        Object.assign(airport, data);
        return this.airportRepository.save(airport);
    }
    async remove(id) {
        const airport = await this.findOne(id);
        await this.airportRepository.remove(airport);
        return true;
    }
};
AirportService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(airport_entity_1.Airport)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], AirportService);
exports.AirportService = AirportService;
//# sourceMappingURL=airport.service.js.map