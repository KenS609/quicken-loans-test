
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as SettleExpensesActions from './settle-expenses.actions';
import { UserExpenses, SettledExpense } from '../models/expenses.model';
import { of } from 'rxjs';
import { exhaustMap, map, catchError, mergeMap, take, switchMap, tap } from 'rxjs/operators';
import { AppState } from '../../../store/reducers';
import { v4 } from 'uuid';
import { Store } from '@ngrx/store';
import { getSelectedUserExpenses, getSettleExpensesRequestPayload } from './settle-expenses.reducer';
import { ApiService, UtilService } from '../../../shared/services';
import { MatDialog } from '@angular/material/dialog';
import { AddUserComponent, AddExpenseComponent, ReportComponent } from '../components';
import { cloneDeep } from 'lodash-es';


@Injectable()
export class SettleExpensesEffects {

    addUser$ = createEffect(() => this.actions$.pipe(
        ofType(SettleExpensesActions.addUser),
        exhaustMap((action) => {
            const userExpenses: UserExpenses = {
                userName: action.userName,
                id: v4(),
                expenses: {},
                totalAmount: 0
            };
            this.utilService.openSnackBar('User added successfully.');
            return of(SettleExpensesActions.addUserSuccess({ user: userExpenses }));
        })
    ));

    removeUser$ = createEffect(() => this.actions$.pipe(
        ofType(SettleExpensesActions.removeUser),
        tap((action) => {
            if (confirm(`Are you sure you want to delete the user ${action.userName} ?`)) {
                this.store.dispatch(SettleExpensesActions.removeUserSuccess({ id: action.id }));
            }
        })
    ), { dispatch: false });

    openAddUserDialog$ = createEffect(() => this.actions$.pipe(
        ofType(SettleExpensesActions.openAddUserDialog),
        tap(() => {
            const dialogRef = this.dialog.open(AddUserComponent, {
                minWidth: '320px'
            });

            dialogRef.afterClosed().pipe(
                take(1)
            ).subscribe(userName => {
                if (userName) {
                    this.store.dispatch(SettleExpensesActions.addUser({ userName }));
                }
            });
        })
    ), { dispatch: false });

    openAddUserExpenseDialog$ = createEffect(() => this.actions$.pipe(
        ofType(SettleExpensesActions.openAddUserExpenseDialog),
        tap(() => {

            const dialogRef = this.dialog.open(AddExpenseComponent, {
                minWidth: '320px'
            });

            dialogRef.afterClosed().pipe(
                take(1)
            ).subscribe(expense => {
                if (expense) {
                    this.store.dispatch(SettleExpensesActions.addUserExpense({ expense }));
                }
            });
        })
    ), { dispatch: false });

    editUserExpense$ = createEffect(() => this.actions$.pipe(
        ofType(SettleExpensesActions.editUserExpense),
        tap((action) => {

            const dialogRef = this.dialog.open(AddExpenseComponent, {
                minWidth: '320px',
                data: action.expense
            });

            dialogRef.afterClosed().pipe(
                take(1)
            ).subscribe(expense => {
                if (expense) {
                    this.store.dispatch(SettleExpensesActions.updateUserExpense({ expense }));
                }
            });
        })
    ), { dispatch: false });

    addUserExpense$ = createEffect(() => this.actions$.pipe(
        ofType(SettleExpensesActions.addUserExpense),
        mergeMap((action) => {
            return this.store.select(getSelectedUserExpenses).pipe(
                take(1),
                switchMap((selectedUserExpenses: UserExpenses) => {
                    const expenseId = v4();
                    const userExpenses: UserExpenses = {
                        ...selectedUserExpenses,
                        expenses: {
                            [expenseId]: {
                                ...action.expense,
                                id: expenseId
                            },
                            ...selectedUserExpenses.expenses
                        },
                        totalAmount: selectedUserExpenses.totalAmount + action.expense.amount
                    };
                    userExpenses.totalAmount = this.formatAmount(userExpenses.totalAmount);
                    this.utilService.openSnackBar('Expense added successfully');
                    return of(SettleExpensesActions.addUserExpenseSuccess({ userExpenses }));
                }));
        })
    ));

    updateUserExpense$ = createEffect(() => this.actions$.pipe(
        ofType(SettleExpensesActions.updateUserExpense),
        mergeMap((action) => {
            return this.store.select(getSelectedUserExpenses).pipe(
                take(1),
                switchMap((selectedUserExpenses: UserExpenses) => {
                    const userExpensesClone = cloneDeep(selectedUserExpenses);
                    userExpensesClone.totalAmount -= userExpensesClone.expenses[action.expense.id].amount;
                    userExpensesClone.expenses[action.expense.id] = {
                        ...action.expense
                    };
                    userExpensesClone.totalAmount += action.expense.amount;
                    userExpensesClone.totalAmount = this.formatAmount(userExpensesClone.totalAmount);
                    this.utilService.openSnackBar('Expense updated successfully');
                    return of(SettleExpensesActions.updateUserExpenseSuccess({ userExpenses: userExpensesClone }));
                }));
        })
    ));


    openRemoveUserExpenseConfirmDialog$ = createEffect(() => this.actions$.pipe(
        ofType(SettleExpensesActions.openRemoveUserExpenseConfirmDialog),
        tap((action) => {

            if (confirm(`Are you sure you want to delete this expense with amount $${action.expense.amount} ?`)) {
                this.store.dispatch(SettleExpensesActions.removeUserExpense({ expenseId: action.expense.id, userId: action.userId }));
            }
        })
    ), { dispatch: false });

    removeUserExpense$ = createEffect(() => this.actions$.pipe(
        ofType(SettleExpensesActions.removeUserExpense),
        mergeMap((action) => {
            return this.store.select(getSelectedUserExpenses).pipe(
                take(1),
                switchMap((selectedUserExpenses: UserExpenses) => {
                    const userExpensesClone = cloneDeep(selectedUserExpenses);
                    userExpensesClone.totalAmount -= userExpensesClone.expenses[action.expenseId].amount;
                    userExpensesClone.totalAmount = this.formatAmount(userExpensesClone.totalAmount);
                    delete userExpensesClone.expenses[action.expenseId];
                    this.utilService.openSnackBar('Expense removed successfully');
                    return of(SettleExpensesActions.updateUserExpenseSuccess({ userExpenses: userExpensesClone }));
                }));
        })
    ));


    settleExpenses$ = createEffect(() => this.actions$.pipe(
        ofType(SettleExpensesActions.settleExpenses),
        mergeMap((action) => {
            return this.store.select(getSettleExpensesRequestPayload).pipe(
                take(1),
                switchMap(payload => {
                    return this.apiService.post<SettledExpense[]>('expenses/settle', { expenses: payload }).pipe(
                        map((settledExpenses) => {
                            console.log('settledExpenses', settledExpenses);
                            this.dialog.open(ReportComponent, {
                                minWidth: '320px',
                                data: settledExpenses
                            });
                            return SettleExpensesActions.settleExpensesSuccess();
                        }),
                        catchError(_ => {
                            this.utilService.openSnackBar('Failed to settle expenses');
                            return of(SettleExpensesActions.settleExpensesFailure());
                        })
                    );

                })
            );
        })
    ));

    formatAmount(amount: number) {
        return parseFloat(amount.toFixed(2));
    }

    constructor(
        private actions$: Actions,
        private utilService: UtilService,
        private dialog: MatDialog,
        private store: Store<AppState>,
        private apiService: ApiService,
    ) { }

}
