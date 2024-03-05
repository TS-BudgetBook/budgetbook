import { CommonModule, NgFor } from '@angular/common';
import { Component, OnInit } from '@angular/core';

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
export class ExpenseListComponent implements OnInit {
  expensesList: any = [];
  savedToken: string = '';
  swipedItemIndex: number = -1;
  touchStartX: number = 0;
  isVisible: boolean = false;
  editingExpense: any;
  isVisibleForm: boolean = false;
  currentPage = 1;
  pageSize = 7;

  expenseId: string = '';
  expenseName: string = '';
  expenseAmount: number = 0;
  expenseType: string = '';
  expenseCategory: string = '';

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

  toggleForm() {
    this.isVisibleForm = !this.isVisibleForm;
  }

  updateExpense(expense: any): void {
    this.toggleForm();
    this.editingExpense = { ...expense };
  }

  deleteExpense(id: string): void {
    this.expenseService.deleteExpense(id);
  }

  ngOnInit(): void {
    this.loadExpenses();
  }

  loadExpenses(): void {
    this.expenseService
      .getExpenses(this.currentPage, this.pageSize)
      .subscribe((data) => {
        this.expensesList = data.expense;
      });
  }

  nextPage(): void {
    this.currentPage++;
    this.loadExpenses();
  }

  prevPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.loadExpenses();
    }
  }

  submitEditForm(): void {
    const updatedExpense = {
      id: this.editingExpense.id,
      name: this.editingExpense.name,
      amount: this.editingExpense.amount,
      type: this.editingExpense.type,
      category: this.editingExpense.category,
      date: this.editingExpense.date,
    };

    console.log('hier', this.editingExpense.id);
    this.expenseService.updateExpense(updatedExpense).subscribe(
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
