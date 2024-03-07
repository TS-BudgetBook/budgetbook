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
exports.ExpenseController = void 0;
const common_1 = require("@nestjs/common");
const expense_service_1 = require("./expense.service");
const swagger_1 = require("@nestjs/swagger");
const jwt_1 = require("@nestjs/jwt");
const auth_guard_1 = require("src/auth/auth.guard");
const expense_entity_1 = require("../entity/expense.entity");
let ExpenseController = class ExpenseController {
    constructor(expenseService, jwtService) {
        this.expenseService = expenseService;
        this.jwtService = jwtService;
    }
    findAll(req, page = 1, limit = 7) {
        return this.expenseService.findAll(req, page, limit);
    }
    findAllElements(req) {
        return this.expenseService.findAllElements(req);
    }
    findOne(id) {
        return this.expenseService.findOne(+id);
    }
    update(req, body) {
        if (body.id) {
            return this.expenseService.update(body.id, body);
        }
        else {
            return this.expenseService.create(req, body);
        }
    }
    remove(id) {
        return this.expenseService.remove(+id);
    }
};
exports.ExpenseController = ExpenseController;
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Query)('page')),
    __param(2, (0, common_1.Query)('limit')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Request, Number, Number]),
    __metadata("design:returntype", void 0)
], ExpenseController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('all'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Request]),
    __metadata("design:returntype", void 0)
], ExpenseController.prototype, "findAllElements", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ExpenseController.prototype, "findOne", null);
__decorate([
    (0, common_1.Put)(),
    (0, swagger_1.ApiOperation)({ summary: 'update or add expense' }),
    (0, swagger_1.ApiBody)({
        description: 'expense',
        type: expense_entity_1.Expense,
    }),
    (0, swagger_1.ApiOkResponse)({
        description: 'expense added/updated sucessfully',
        type: expense_entity_1.Expense,
    }),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], ExpenseController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ExpenseController.prototype, "remove", null);
exports.ExpenseController = ExpenseController = __decorate([
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Controller)('expense'),
    (0, common_1.Injectable)(),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    __metadata("design:paramtypes", [expense_service_1.ExpenseService,
        jwt_1.JwtService])
], ExpenseController);
//# sourceMappingURL=expense.controller.js.map