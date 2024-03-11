import { Injectable } from '@nestjs/common';
import { Counter, register } from 'prom-client';

@Injectable()
export class MetricsService {
    private readonly newUserCounter: Counter;
    private readonly existingUserCounter: Counter;
    constructor() {
        const newUserCounter = new Counter({
            name: 'nestjs_newuser_total',
            help: 'Total number of users to the NestJS app',
        });

        const existingUserCounter = new Counter({
            name: 'nestjs_existingUser_total',
            help: 'Total number of existing users to the NestJS app',
        });
        register.clear();
        register.setDefaultLabels({
            app: 'nestjs-prometheus-demo',
        });
        register.registerMetric(newUserCounter);
        register.registerMetric(existingUserCounter );
    }
    incrementRequestCounter(): void {
        this.newUserCounter.inc();
        this.existingUserCounter.inc();
    }
}