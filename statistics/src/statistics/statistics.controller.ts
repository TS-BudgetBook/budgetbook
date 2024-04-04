import {
  Controller,
  Get,
  Injectable,
  Logger,
  Req,
  UseGuards,
} from '@nestjs/common';
import { StatisticsService } from './statistics.service';
import { ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/auth.guard';

@ApiBearerAuth()
@Controller('statistics')
@Injectable()
@UseGuards(AuthGuard)
export class StatisticsController {
  constructor(private statisticsService: StatisticsService) {}
  private logger = new Logger(`STATISTICS`);

  @Get('')
  getStatistics(@Req() req: any) {
    this.logger.debug(`Logging HTTP Route ${req.method} ${req.url}`);
    const userid = req.customer.sub;
    return this.statisticsService.getStatistics(userid);
  }
}
