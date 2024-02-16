import { Component } from '@angular/core';
import { ExpenseFormComponent } from '../../components/expense-form/expense-form.component';
import { ExpenseListComponent } from '../../components/expense-list/expense-list.component';
import { HeaderComponent } from '../../components/header/header.component';

@Component({
  selector: 'app-expenses',
  standalone: true,
  imports: [HeaderComponent, ExpenseListComponent, ExpenseFormComponent],
  templateUrl: './expenses.component.html',
  styleUrl: './expenses.component.css',
})
export class ExpensesComponent {}
