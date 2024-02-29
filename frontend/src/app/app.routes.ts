import { RouterModule, Routes } from '@angular/router';

import { ExpensesComponent } from './pages/expenses/expenses.component';
import { HomeComponent } from './pages/home/home.component';
import { NgModule } from '@angular/core';
import { StatisticsComponent } from './pages/statistics/statistics.component';
import { TokenGuard } from './guard/token.guard';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'expenses', component: ExpensesComponent, canActivate: [TokenGuard] },
  {
    path: 'statistics',
    component: StatisticsComponent,
    canActivate: [TokenGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
