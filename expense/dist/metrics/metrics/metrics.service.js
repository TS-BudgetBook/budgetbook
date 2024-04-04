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
exports.MetricsService = void 0;
const prom_client_1 = require("prom-client");
const common_1 = require("@nestjs/common");
let MetricsService = class MetricsService {
    constructor() {
        this.newExpenseCount = 0;
        this.newExpenseCounter = new prom_client_1.Counter({
            name: 'newExpense_total',
            help: 'Total number of expenses to the BudgetBOOK app',
        });
        prom_client_1.register.clear();
    }
    incrementnewExpenseCounter() {
        this.newExpenseCounter.inc();
        this.newExpenseCount++;
    }
    getMetrics() {
        return {
            service: 'expense',
            newExpenses: this.newExpenseCount,
        };
    }
};
exports.MetricsService = MetricsService;
exports.MetricsService = MetricsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], MetricsService);
//# sourceMappingURL=metrics.service.js.map