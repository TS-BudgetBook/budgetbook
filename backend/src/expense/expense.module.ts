import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Expense } from '../entity/expense.entity';
import { PaymentService } from './expense.service';
import { PaymentController } from './expense.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Expense])],
  controllers: [PaymentController],
  providers: [PaymentService],
})
export class PaymentModule {}
