
export interface Expense {
    id?: string;
    date: string;
    description: string;
    amount: number;
}

export interface SettleExpenseRequestPayload {
    expenses: Array<{ user: string, amount: number }>;
}


export interface UserExpenses {
    id: string;
    userName: string;
    expenses: {
        [key: string]: Expense;
    };
    expensesList?: Expense[];
    totalAmount: number;
}

export interface SettledExpense {
    owingUser: string;
    payableTo: string;
    amount: number;
}
