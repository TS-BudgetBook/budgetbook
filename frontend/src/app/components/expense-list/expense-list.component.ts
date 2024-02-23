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

  isVisible: boolean = false;

  toggleVisibility() {
    this.isVisible = !this.isVisible;
  }

  expenseId: number = 0;
  expenseName: string = '';
  expenseAmount: number = 0;
  expenseType: string = '';
  expenseCategory: string = '';

  updateExpense(expense: any): void {
    this.toggleVisibility();

    this.editingExpense = { ...expense };
    console.log('this.editingExpense', this.editingExpense);
  }

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
    const updatedExpense = {
      name: this.editingExpense.name,
      amount: this.editingExpense.amount,
      type: this.editingExpense.type,
      category: this.editingExpense.category,
      date: this.editingExpense.date,
    };

    this.expenseService
      .updateExpense(this.editingExpense.id, updatedExpense)
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
