import { Controller, Get } from '@nestjs/common';

import { MetricsService } from './metrics.service';

@Controller('metrics')
export class MetricsController {
  constructor(private readonly metricsService: MetricsService) {}

  @Get()
  getHello(): any {
    let metrics = this.metricsService.incrementNewUserCounter();
    this.metricsService.incrementExistingUserCounter();
    console.log('metrics', metrics);
  }

  /*  @Get()
  getHello(): string {
    this.metricsService.incrementRequestCounter();
    return 'Hello, Prometheus!';
  } */
}
