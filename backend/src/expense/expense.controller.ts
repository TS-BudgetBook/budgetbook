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
  findAll(@Req() req) {
    return this.paymentService.findAll(req);
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
