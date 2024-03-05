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
import { PaymentService } from './expense.service';
import { ApiBearerAuth } from '@nestjs/swagger';
import { JwtService } from '@nestjs/jwt';
import { AuthGuard } from 'src/auth/auth.guard';

@ApiBearerAuth()
@Controller('expense')
@Injectable()
@UseGuards(AuthGuard)
export class PaymentController {
  constructor(
    private readonly paymentService: PaymentService,
    private jwtService: JwtService,
  ) {}

  @Get()
  findAll(
    @Req() req: Request,
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 7,
  ) {
    return this.paymentService.findAll(req, page, limit);
  }

  /*   @Get('all')
  async findAllElements(@Req() req: Request) {
    return await this.paymentService.findAllElements(req);
  } */

  @Get('all')
  findAllElements() {
    return this.paymentService.findAllElements();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.paymentService.findOne(+id);
  }

  @Put()
  update(@Req() req, @Body() body: any) {
    if (body.id) {
      return this.paymentService.update(body.id, body);
    } else {
      return this.paymentService.create(req, body);
    }
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.paymentService.remove(+id);
  }
}
