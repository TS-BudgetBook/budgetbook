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
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const customer_service_1 = require("../customer/customer.service");
const jwt_1 = require("@nestjs/jwt");
let AuthService = class AuthService {
    constructor(customerService, jwtService) {
        this.customerService = customerService;
        this.jwtService = jwtService;
    }
    async validateCustomerByEmail(email) {
        const customer = await this.customerService.findByEmail(email);
        return customer;
    }
    googleLogin(req, res) {
        console.log(req.user);
    }
    generateToken(user) {
        const payload = { googleId: user.googleId, email: user.email };
        return this.jwtService.sign(payload);
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [customer_service_1.CustomerService,
        jwt_1.JwtService])
], AuthService);
//# sourceMappingURL=auth.service.js.map