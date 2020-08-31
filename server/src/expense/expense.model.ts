export interface Expense {
    user: string;
    amount: number;
}

export interface SettledExpense {
    owingUser: string;
    payableTo: string;
    amount: number;
}