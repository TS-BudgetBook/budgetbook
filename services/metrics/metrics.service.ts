import { Counter, register } from "prom-client";

import { Injectable } from "@nestjs/common";

@Injectable()
export class MetricsService {
  constructor() {
    const requestCounter = new Counter({
      name: "nestjs_requests_total",
      help: "Total number of requests to the NestJS app",
    });
    register.clear();
    register.setDefaultLabels({
      app: "nestjs-prometheus-demo",
    });
    register.registerMetric(requestCounter);
  }
  incrementRequestCounter(): void {
    requestCounter.inc();
  }
}
