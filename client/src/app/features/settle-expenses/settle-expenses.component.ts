import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { AppState } from '../../../app/store/reducers';
import { UserExpenses } from './models/expenses.model';
import { selectUserExpenses, selectExpenseLoading } from './store/settle-expenses.reducer';
import { openAddUserDialog, settleExpenses } from './store/settle-expenses.actions';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';


@Component({
  selector: 'app-settle-expenses',
  templateUrl: './settle-expenses.component.html',
  styleUrls: ['./settle-expenses.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SettleExpensesComponent implements OnInit {

  userExpenses$: Observable<UserExpenses[]> = of([]);
  loading$: Observable<boolean> = of(false);

  constructor(
    public dialog: MatDialog,
    private store: Store<AppState>
  ) {
    this.setSelectors();
  }

  ngOnInit(): void {
  }

  setSelectors() {
    this.userExpenses$ = this.store.select(selectUserExpenses).pipe(
      map(userExpenses => userExpenses.map(userExpense => ({
        ...userExpense,
        expensesList: Object.values(userExpense.expenses)
      })))
    );
    this.loading$ = this.store.select(selectExpenseLoading);
  }

  addUser() {
    this.store.dispatch(openAddUserDialog());
  }

  calculateExpenses() {
    this.store.dispatch(settleExpenses());
  }

}
