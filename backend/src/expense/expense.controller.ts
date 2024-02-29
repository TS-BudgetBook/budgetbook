import {
  Controller,
  ExecutionContext,
  Post,
  Get,
  Body,
  Res,
  HttpStatus,
  Delete,
  Put,
  Param,
  Injectable,
  Req,
} from '@nestjs/common';
import { PaymentService } from './expense.service';
import { Request } from 'express';

@Controller('payment')
@Injectable()
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  /*   @Post()
  create(@Body() body: any,@Req() req: Request) {
    return this.paymentService.create(body,req);
  } */

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
    console.log('body.id', body.id);
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
