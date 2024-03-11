import { Controller, Get } from '@nestjs/common';
import { MetricsService } from './metrics.service';

@Controller('metrics')
export class MetricsController {
    constructor(private readonly metricsService: MetricsService) {}
    
    @Get()
    getHello(): string {
    this.metricsService.incrementRequestCounter();
    return 'Hello, Prometheus!';
    }
}
