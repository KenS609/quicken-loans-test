import { createAction, props } from '@ngrx/store';
import { UserExpenses, Expense, SettleExpenseRequestPayload, SettledExpense } from '../models/expenses.model';



export const openAddUserDialog = createAction(
    '[Settle Expenses] Open Add User Dialog'
);

export const addUser = createAction(
    '[Settle Expenses] Add User',
    props<{ userName: string }>()
);

export const addUserSuccess = createAction(
    '[Settle Expenses] Add User Success',
    props<{ user: UserExpenses }>()
);

export const addUserFailure = createAction(
    '[Settle Expenses] Add User Failure'
);

export const removeUser = createAction(
    '[Settle Expenses] Remove User',
    props<{ id: string, userName: string }>()
);

export const removeUserSuccess = createAction(
    '[Settle Expenses] Remove User Success',
    props<{ id: string }>()
);

export const removeUserFailure = createAction(
    '[Settle Expenses] Remove User Failure'
);

export const openAddUserExpenseDialog = createAction(
    '[Settle Expenses] Open Add User Expense Dialog',
    props<{ userId: string }>()
);

export const addUserExpense = createAction(
    '[Settle Expenses] Add User Expense',
    props<{ expense: Expense }>()
);

export const addUserExpenseSuccess = createAction(
    '[Settle Expenses] Add User Expense Success',
    props<{ userExpenses: UserExpenses }>()
);

export const addUserExpenseFailure = createAction(
    '[Settle Expenses] Add User Expense Failure'
);

export const editUserExpense = createAction(
    '[Settle Expenses] Edit User Expense Dialog',
    props<{ userId: string, expense: Expense }>()
);

export const updateUserExpense = createAction(
    '[Settle Expenses] Update User Expense',
    props<{ expense: Expense }>()
);

export const updateUserExpenseSuccess = createAction(
    '[Settle Expenses] Update User Expense Success',
    props<{ userExpenses: UserExpenses }>()
);

export const updateUserExpenseFailure = createAction(
    '[Settle Expenses] Update User Expense Failure'
);

export const openRemoveUserExpenseConfirmDialog = createAction(
    '[Settle Expenses] Open Remove User Expense Confirm Dialog',
    props<{ userId: string, expense: Expense }>()
);

export const removeUserExpense = createAction(
    '[Settle Expenses] Remove User Expense',
    props<{ userId: string, expenseId: string }>()
);

export const removeUserExpenseSuccess = createAction(
    '[Settle Expenses] Remove User Expense Success',
    props<{ userExpenses: UserExpenses }>()
);

export const removeUserExpenseFailure = createAction(
    '[Settle Expenses] Remove User Expense Failure'
);

export const settleExpenses = createAction(
    '[Settle Expenses/API] Settle Expenses'
);

export const settleExpensesSuccess = createAction(
    '[Settle Expenses/API] Settle Expenses Success'
);

export const settleExpensesFailure = createAction(
    '[Settle Expenses/API] Settle Expenses Failure'
);
