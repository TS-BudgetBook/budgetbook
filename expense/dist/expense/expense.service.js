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
exports.ExpenseService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const expense_entity_1 = require("../entity/expense.entity");
let ExpenseService = class ExpenseService {
    constructor(expenseRepository) {
        this.expenseRepository = expenseRepository;
    }
    async findAll(req, page = 1, limit = 10) {
        const customerid = req.customer.sub;
        try {
            const [expense, totalItems] = await this.expenseRepository.findAndCount({
                where: { customerid: customerid },
                take: limit,
                skip: (page - 1) * limit,
            });
            return { expense, totalItems };
        }
        catch (error) {
            console.error(error);
            throw error;
        }
    }
    async findAllElements(req) {
        const customerid = req.customer.sub;
        try {
            const expenses = await this.expenseRepository.find({
                where: { customerid: customerid },
            });
            return expenses;
        }
        catch (error) {
            console.error(error);
            throw error;
        }
    }
    findOne(id) {
        const payment = this.expenseRepository.findOneBy({ id: id });
        if (!payment) {
            throw new common_1.NotFoundException(`Payment with ID ${id} not found`);
        }
        return payment;
    }
    async create(req, body) {
        body.customerid = req.customer.sub;
        const payment = this.expenseRepository.create(body);
        return this.expenseRepository.save(payment);
    }
    async update(id, body) {
        await this.expenseRepository.update(id, body);
        return this.findOne(id);
    }
    async remove(id) {
        await this.expenseRepository.delete(id);
    }
};
exports.ExpenseService = ExpenseService;
exports.ExpenseService = ExpenseService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(expense_entity_1.Expense)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], ExpenseService);
//# sourceMappingURL=expense.service.js.map