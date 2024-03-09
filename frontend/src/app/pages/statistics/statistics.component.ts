import { Component, OnInit } from '@angular/core';

import { HeaderComponent } from '../../components/header/header.component';
import { PieChartComponent } from '../../components/piechart/piechart.component';
import { StatisticsListComponent } from '../../components/statistics-list/statistics-list.component';
import { StatisticsService } from '../../services/statistics.service';

@Component({
  standalone: true,
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.css'],
  imports: [HeaderComponent, PieChartComponent, StatisticsListComponent],
})
export class StatisticsComponent {

  pieChartData: any = {};

  constructor(
    private statisticsService: StatisticsService
  ) { }

}
