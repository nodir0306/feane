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
const user_1 = require("../user");
const sequelize_1 = require("@nestjs/sequelize");
const config_1 = require("@nestjs/config");
const jwt_1 = require("@nestjs/jwt");
let AuthService = class AuthService {
    constructor(userModel, config, jwt) {
        this.userModel = userModel;
        this.config = config;
        this.jwt = jwt;
    }
    async login(payload) {
        const foundedUser = await this.userModel.findOne({
            where: { email: payload.email, phone: payload.phone }
        });
        if (!foundedUser) {
            throw new common_1.NotFoundException("User not found");
        }
        const accesToken = await this.jwt.signAsync({
            id: foundedUser.id,
            role: foundedUser.role,
        }, {
            expiresIn: this.config.get('jwt.accessKey'),
            secret: this.config.get('jwt.accessTime')
        });
        const refreshToken = await this.jwt.signAsync({
            id: foundedUser.id,
            role: foundedUser.role,
        }, {
            expiresIn: this.config.get('jwt.refreshTime'),
            secret: this.config.get('jwt.refreshKey')
        });
        return {
            accesToken: accesToken,
            refreshToken: refreshToken,
            message: "ok"
        };
    }
    async register() { }
    async logout() { }
    async refresh() { }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, sequelize_1.InjectModel)(user_1.User)),
    __metadata("design:paramtypes", [Object, config_1.ConfigService, jwt_1.JwtService])
], AuthService);
//# sourceMappingURL=auth.service.js.map