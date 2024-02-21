import { Controller, Post, Get, Body, Res, HttpStatus, Delete, Put, Param, Injectable } from '@nestjs/common';
import { PaymentService } from './payment.service';


@Controller('payment')
@Injectable()
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) { }





  @Get()
  findAll() {
    return this.paymentService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.paymentService.findOne(+id);
  }

  @Put()
  update(@Body() body: any) {

    console.log(body);
    if (body.id) {
      return this.paymentService.update(body.id, body);
    } else {
      return this.paymentService.create(body);
    }


  }

   @Delete(':id')
  remove(@Param('id') id: string) {
    return this.paymentService.remove(+id);
  }
}