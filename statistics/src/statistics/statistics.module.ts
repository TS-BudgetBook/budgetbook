import { Logger, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Expense } from '../entity/expense.entity';
import { StatisticsService } from './statistics.service';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { StatisticsController } from './statistics.controller';
import { PrometheusModule, makeCounterProvider } from '@willsoto/nestjs-prometheus'

@Module({
    imports: [TypeOrmModule.forFeature([Expense]),
    PrometheusModule.register({
        defaultMetrics: {
            enabled: false,
        }
    }),
    JwtModule.register({
        global: true,
        secret: '829c4db7e4615364b0d31422c5ab536ec5d3542ceb26a25f2b68da527cfa8ba2',
        signOptions: { expiresIn: '3d' },
    }),],
    controllers: [StatisticsController],
    providers: [StatisticsService,
        JwtService,
        ConfigService,
        Logger,
        makeCounterProvider({
            name: "bb_auth_aufrufe_statistics_count",
            help: "Count all aufrufe_statistics",
        }),
    ],
})
export class StatisticsModule { }
