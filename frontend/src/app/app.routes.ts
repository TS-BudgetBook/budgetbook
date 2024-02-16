import { RouterModule, Routes } from '@angular/router';

import { ExpensesComponent } from './pages/expenses/expenses.component';
import { LoginComponent } from './components/login/login.component';
import { NgModule } from '@angular/core';

export const routes: Routes = [
  { path: '', component: ExpensesComponent },
  { path: 'login', component: LoginComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
