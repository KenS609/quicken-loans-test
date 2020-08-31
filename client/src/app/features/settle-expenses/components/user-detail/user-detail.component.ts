import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UserExpenses, Expense } from '../../models/expenses.model';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/reducers';
import { openAddUserExpenseDialog, editUserExpense, openRemoveUserExpenseConfirmDialog, removeUser as removeUserAction } from '../../store/settle-expenses.actions';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserDetailComponent implements OnInit {
  activeUserPanel$ = new BehaviorSubject(null);

  constructor(
    public dialog: MatDialog,
    private store: Store<AppState>
  ) { }

  @Input() users: UserExpenses[] = [];

  ngOnInit(): void {
  }

  toggleUserPanel(userId: string) {
    this.activeUserPanel$.next(userId);
  }

  onPanelClose(userId: string) {
    if (this.activeUserPanel$.value === userId) {
      this.activeUserPanel$.next(null);
    }
  }

  editExpense(userId: string, expense: Expense) {
    this.store.dispatch(editUserExpense({ userId, expense }));
  }

  removeExpense(userId: string, expense: Expense) {
    this.store.dispatch(openRemoveUserExpenseConfirmDialog({ userId, expense }));
  }

  removeUser(event: MouseEvent, user: UserExpenses) {
    event.stopPropagation();
    this.store.dispatch(removeUserAction({ id: user.id, userName: user.userName }));
  }

  addExpense(event: MouseEvent, userId: string) {
    event.stopPropagation();
    this.store.dispatch(openAddUserExpenseDialog({ userId }));
  }

  trackById(index: number, resource: Expense | UserExpenses): string {
    return resource.id;
  }

}
