import { Counter, register } from 'prom-client';

import { Injectable } from '@nestjs/common';

@Injectable()
export class MetricsService {
    private readonly newUserCounter: Counter;
    private readonly existingUserCounter: Counter;
    private newUserCount: number = 0;
    private existingUserCount: number = 0;


    constructor() {
        this.newUserCounter = new Counter({
            name: 'newUser_total',
            help: 'Total number of users to the BudgetBOOK app',
        });

        this.existingUserCounter = new Counter({
            name: 'existingUser_total',
            help: 'Total number of existing users to the BudgetBOOK app',
        });
        // register.clear();
        // register.setDefaultLabels({
        //   app: 'nestjs-prometheus-demo',
        // });
        // register.registerMetric(this.newUserCounter);
        // register.registerMetric(this.existingUserCounter);
    }

    incrementNewUserCounter(): void {
        this.newUserCounter.inc();
        this.newUserCount++;
    }

    incrementExistingUserCounter(): void {
        this.existingUserCounter.inc();
        this.existingUserCount++;
    }

    getMetrics(): any {
        return {
            service: 'auth',
            newUsers: this.newUserCount,
            existingUsers: this.existingUserCount,
        };
    }

    // getMetrics(): any {
    //     const newUsersCount = this.newUserCounter.get();
    //     const existingUsersCount = this.existingUserCounter.get();

    //     return {
    //         service: 'auth',
    //         newUsers: newUsersCount,
    //         existingUsers: existingUsersCount,
    //     };
    // }



    /*   incrementRequestCounter(): void {
        this.newUserCounter.inc();
        this.existingUserCounter.inc();
    } */

    //   getMetrics(): any {
    //     /* this.newUserCounter.inc(); */
    //     return register.metrics();
    //   }

    /*   incrementExistingUserCounter(): any {
        this.existingUserCounter.inc();
    } */
}
