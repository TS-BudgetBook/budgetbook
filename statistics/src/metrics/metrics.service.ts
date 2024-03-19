import { Injectable } from '@nestjs/common';
import { Counter, register } from 'prom-client';


@Injectable()
export class MetricsService {
    private readonly StatisticsCounter: Counter;
    private StatisticsCount: any;

    constructor() {
        this.StatisticsCounter = new Counter({
            name: 'Statistics_view_total',
            help: 'Total Number of viewed statistics',
        });
        register.clear();
        register.registerMetric(this.StatisticsCounter);
        

    }

    async incrementStatisticsCounter(): Promise<any> {
        this.StatisticsCounter.inc();
    }

    getMetrics(): any {
        let metrics = register.metrics().then(data =>  {return data} );
        return {
            service: 'statistics',
            count: metrics
        };
    }
}