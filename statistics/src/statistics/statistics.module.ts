import { Logger, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Expense } from '../entity/expense.entity';
import { StatisticsService } from './statistics.service';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { StatisticsController } from './statistics.controller';

@Module({
    imports: [TypeOrmModule.forFeature([Expense]),
    JwtModule.register({
        global: true,
        secret: 'It3n4FJ2uO8VJhMXLQobzIyqKvWMnI',
        signOptions: { expiresIn: '3d' },
    }),],
    controllers: [StatisticsController],
    providers: [StatisticsService, JwtService, ConfigService, Logger],
})
export class StatisticsModule { }
