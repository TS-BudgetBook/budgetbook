import { Injectable } from '@nestjs/common';
import { Counter, register } from 'prom-client';

@Injectable()
export class MetricsService {
    private readonly newUserCounter: Counter;
    private readonly existingUserCounter: Counter;
    constructor() {
        this.newUserCounter = new Counter({
            name: 'nestjs_newuser_total',
            help: 'Total number of users to the NestJS app',
        });

        this.existingUserCounter = new Counter({
            name: 'nestjs_existingUser_total',
            help: 'Total number of existing users to the NestJS app',
        });
        register.clear();
        register.setDefaultLabels({
            app: 'nestjs-prometheus-demo',
        });
        register.registerMetric(this.newUserCounter);
        register.registerMetric(this.existingUserCounter );
    }

    incrementRequestCounter(): void {
        this.newUserCounter.inc();
        this.existingUserCounter.inc();
    }
}