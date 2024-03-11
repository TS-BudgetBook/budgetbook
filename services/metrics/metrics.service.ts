import { Counter, register } from "prom-client";
import { Injectable } from "@nestjs/common";

@Injectable()
export class MetricsService {
  constructor(
    private readonly requestCounter: Counter
  ) {

  this.requestCounter = new Counter({
    name: 'nestjs_requests_total',
    help: 'Total number of requests to the NestJS app',
  });

register.clear();
register.setDefaultLabels({
  app: 'nestjs-prometheus-demo',
});
register.registerMetric(this.requestCounter);
}
incrementRequestCounter(): void {
  this.requestCounter.inc();
}
}

