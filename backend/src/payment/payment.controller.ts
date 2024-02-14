import { Controller, Post, Get, Body, Res, HttpStatus, Delete, Put, Param } from '@nestjs/common';
import { PaymentService } from './payment.service';

@Controller('payment')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @Post()
  createPayment(@Body() paymentData) {
      // Logik zum Erstellen einer neuen Zahlung
  }

  @Get()
  getAllPayments() {
      // Logik zum Abrufen aller Zahlungen
  }

  @Get(':id')
  getPaymentById(@Param('id') id: string) {
      // Logik zum Abrufen einer spezifischen Zahlung
  }

  @Put(':id')
  updatePayment(@Param('id') id: string, @Body() updateData) {
      // Logik zum Aktualisieren einer Zahlung
  }

  @Delete(':id')
  deletePayment(@Param('id') id: string) {
      // Logik zum Löschen einer Zahlung
  }

}