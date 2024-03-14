"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExpenseModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const expense_entity_1 = require("../entity/expense.entity");
const expense_service_1 = require("./expense.service");
const expense_controller_1 = require("./expense.controller");
const jwt_1 = require("@nestjs/jwt");
const config_1 = require("@nestjs/config");
let ExpenseModule = class ExpenseModule {
};
exports.ExpenseModule = ExpenseModule;
exports.ExpenseModule = ExpenseModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([expense_entity_1.Expense]),
        jwt_1.JwtModule.register({
            global: true,
            secret: '829c4db7e4615364b0d31422c5ab536ec5d3542ceb26a25f2b68da527cfa8ba2',
            signOptions: { expiresIn: '3d' },
        }),],
        controllers: [expense_controller_1.ExpenseController],
        providers: [expense_service_1.ExpenseService, jwt_1.JwtService, config_1.ConfigService, common_1.Logger],
    })
], ExpenseModule);
//# sourceMappingURL=expense.module.js.map