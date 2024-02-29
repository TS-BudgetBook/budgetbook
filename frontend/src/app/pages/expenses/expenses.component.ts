import { Component } from '@angular/core';
import { ExpenseListComponent } from '../../components/expense-list/expense-list.component';
import { HeaderComponent } from '../../components/header/header.component';

@Component({
  selector: 'app-expenses',
  standalone: true,
  imports: [HeaderComponent, ExpenseListComponent],
  templateUrl: './expenses.component.html',
  styleUrl: './expenses.component.css',
})
export class ExpensesComponent {}
