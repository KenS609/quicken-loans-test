import { Action, createReducer, on, createFeatureSelector, createSelector } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { UserExpenses, Expense } from '../models/expenses.model';
import * as SettleExpensesActions from './settle-expenses.actions';


export const settleExpensesFeatureKey = 'expenses';

export interface State extends EntityState<UserExpenses> {
    // additional entities state properties
    loaded: boolean;
    loading: boolean;
    selectedExpense: Expense;
    selectedUser: string;
}


const defaultState = {
    selectedExpense: null,
    selectedUser: null,
};

export const adapter: EntityAdapter<UserExpenses> = createEntityAdapter<UserExpenses>();

export const initialState: State = adapter.getInitialState({
    // additional entity state properties
    loaded: false,
    loading: false,
    selectedExpense: null,
    selectedUser: null
});


const settleExpensesReducer = createReducer(
    initialState,

    on(SettleExpensesActions.addUser,
        SettleExpensesActions.addUserExpense,
        SettleExpensesActions.addUserExpense,
        SettleExpensesActions.updateUserExpense,
        SettleExpensesActions.removeUserExpense,
        SettleExpensesActions.settleExpenses,
        (state, action) => ({ ...state, loading: true })
    ),

    on(SettleExpensesActions.openAddUserExpenseDialog,
        SettleExpensesActions.editUserExpense,
        (state, action) => ({ ...state, selectedUser: action.userId })
    ),

    on(SettleExpensesActions.addUserFailure,
        SettleExpensesActions.addUserExpenseFailure,
        SettleExpensesActions.updateUserExpenseFailure,
        SettleExpensesActions.removeUserExpenseFailure,
        SettleExpensesActions.settleExpensesSuccess,
        SettleExpensesActions.settleExpensesFailure,
        (state, action) => ({ ...state, loading: false })
    ),

    /** Add User Action */
    on(SettleExpensesActions.addUserSuccess,
        (state, action) => adapter.addOne(action.user, {
            ...state,
            ...defaultState,
            loading: false
        })
    ),

    /** Remove User Action */
    on(SettleExpensesActions.removeUserSuccess,
        (state, action) => adapter.removeOne(action.id, {
            ...state,
            loading: false
        })
    ),

    /** Add, Update & Remove User Success Expense Action */
    on(SettleExpensesActions.addUserExpenseSuccess,
        SettleExpensesActions.updateUserExpenseSuccess,
        SettleExpensesActions.removeUserExpenseSuccess,
        (state, action) => adapter.updateOne({
            id: action.userExpenses.id,
            changes: action.userExpenses
        }, {
            ...state,
            loading: false
        })
    )
);

export function reducer(state: State | undefined, action: Action) {
    return settleExpensesReducer(state, action);
}

// selectors
export const getExpensesState = createFeatureSelector<State>(settleExpensesFeatureKey);

export const {
    selectIds,
    selectEntities,
    selectAll,
    selectTotal,
} = adapter.getSelectors();

export const selectExpenseLoading = createSelector(getExpensesState, state => state.loading);
export const selectExpenseLoaded = createSelector(getExpensesState, state => state.loaded);
export const getSelectedUser = createSelector(getExpensesState, state => state.selectedUser);
export const getSelectedUserExpenses = createSelector(getExpensesState, state => state.entities[state.selectedUser]);
export const getSettleExpensesRequestPayload = createSelector(getExpensesState, state => Object.keys(state.entities).map(userId => ({
    user: state.entities[userId].userName,
    amount: state.entities[userId].totalAmount,
})));
export const selectUserExpenses = createSelector(getExpensesState, selectAll);
