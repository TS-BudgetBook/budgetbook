import { Controller, Get } from '@nestjs/common';

import { MetricsService } from './metrics.service';

@Controller('metrics')
export class MetricsController {
  constructor(private readonly metricsService: MetricsService) {}

  @Get()
  getMetrics(): string {
    /* this.metricsService.incrementNewUserCounter();
    this.metricsService.incrementExistingUserCounter(); */
    return this.metricsService.getMetrics();
  }

  /*  @Get()
  getHello(): string {
    this.metricsService.incrementRequestCounter();
    return 'Hello, Prometheus!';
  } */
}
