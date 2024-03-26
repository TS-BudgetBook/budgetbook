import {
  Controller,
  Get,
  Body,
  Delete,
  Put,
  Param,
  Injectable,
  Req,
  UseGuards,
  Query,
} from '@nestjs/common';
import { ExpenseService } from './expense.service';
import { ApiBearerAuth, ApiBody, ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/auth.guard';
import { Expense } from 'src/entity/expense.entity';

@ApiBearerAuth()
@Controller('expense')
@Injectable()
@UseGuards(AuthGuard)
export class ExpenseController {
  constructor(
    private readonly expenseService: ExpenseService
  ) { }

  @Get()
  findAll(
    @Req() req: Request,
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 7,
  ) {
    return this.expenseService.findAll(req, page, limit);
  }

  @Get('all')
  findAllElements(@Req() req: Request) {
    return this.expenseService.findAllElements(req);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.expenseService.findOne(+id);
  }

  @Put()
  @ApiOperation({ summary: 'update or add expense' })
  @ApiBody({
    description: 'expense',
    type: Expense,

  })
  @ApiOkResponse({
    description: 'expense added/updated sucessfully',
    type: Expense,
  })
  update(@Req() req, @Body() body: any) {
    if (body.id) {
      return this.expenseService.update(body.id, body);
    } else {
      return this.expenseService.create(req, body);
    }
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.expenseService.remove(+id);
  }
}
