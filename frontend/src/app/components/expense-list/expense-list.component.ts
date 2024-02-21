import { CommonModule, NgFor } from '@angular/common';

import { Component } from '@angular/core';
import { ExpenseFormComponent } from '../expense-form/expense-form.component';
import { ExpenseService } from '../../services/expense-service.service';
import { FormsModule } from '@angular/forms';

@Component({
  standalone: true,
  imports: [NgFor, ExpenseFormComponent, CommonModule, FormsModule],
  selector: 'app-expense-list',
  templateUrl: './expense-list.component.html',
  styleUrls: ['./expense-list.component.css'],
})
export class ExpenseListComponent {
  expensesList: any = [];
  editingExpense: any;
  swipedItemIndex: number = -1;
  touchStartX: number = 0;

  constructor(private expenseService: ExpenseService) {}

  onTouchStart(event: TouchEvent, index: number): void {
    this.touchStartX = event.touches[0].clientX;
    this.swipedItemIndex = index;
  }

  onTouchEnd(event: TouchEvent): void {
    const touchEndX = event.changedTouches[0].clientX;
    const deltaX = touchEndX - this.touchStartX;

    if (deltaX < -50) {
    } else if (deltaX > 50 && this.swipedItemIndex !== -1) {
      this.swipedItemIndex = -1;
    }
  }

  ngOnInit(): void {
    this.expensesList = this.expenseService.getExpenses().subscribe(
      (expensesList: any[]) => {
        this.expensesList = expensesList;
      },
      (error) => {
        console.error('Error fetching expenses:', error);
      }
    );
  }

  deleteExpense(id: number): void {
    this.expenseService.deleteExpense(id);
  }

  submitEditForm(): void {
    this.expenseService
      .editExpense(this.editingExpense.id, this.editingExpense)
      .subscribe(
        (response) => {
          console.log('PUT request successful:', response);
          window.location.reload();
        },
        (error) => {
          console.error('Error making PUT request:', error);
        }
      );
  }
}
