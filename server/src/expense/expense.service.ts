import { Injectable } from '@nestjs/common';
import { Expense, SettledExpense } from './expense.model';

@Injectable()
export class ExpenseService {

    settleExpenses(expenses: Array<Expense>): Array<SettledExpense> {
        try {

            // calculate sum of all the expenses given by the user
            const sum = expenses.reduce((acc, curr) => curr.amount + acc, 0);

            // calculate average expense per user
            const mean = sum / expenses.length;
            const settleResults: Array<SettledExpense> = [];

            // Sort expenses by amount
            const expensesSortedByAmount = expenses.sort((prevUser, currentUser) => prevUser.amount - currentUser.amount);

            // Map paid and remaining values
            const sortedPaidAmounts = expensesSortedByAmount.map((user) => user.amount - mean);

            let i = 0;
            let j = expensesSortedByAmount.length - 1;
            let debt = 0;

            // start from first and last user
            // Because first user will be least paying
            // and last user will be most paying user.
            while (i < j) {

                // find minimum value between first and last user 
                debt = Math.min(-(sortedPaidAmounts[i]), sortedPaidAmounts[j]);

                // add debt to first user as that user has paid the least
                sortedPaidAmounts[i] += debt;

                // remove debt from last user as it will be to the first user
                sortedPaidAmounts[j] -= debt;

                // store result if debt is not zero
                if (parseFloat(debt.toFixed(2)) > 0.00) {

                    // console.log(`${expensesSortedByAmount[i].user} owes ${expensesSortedByAmount[j].user} $${debt.toFixed(2)}`);
                    settleResults.push({
                        owingUser: expensesSortedByAmount[i].user,
                        payableTo: expensesSortedByAmount[j].user,
                        amount: parseFloat(debt.toFixed(2))
                    });
                }

                // if all the due amount has been paid, move to next user
                if (sortedPaidAmounts[i] === 0) {
                    i++;
                }

                // if zero amount remaining to be paid move to user before the current user
                if (sortedPaidAmounts[j] === 0) {
                    j--;
                }
            }

            return settleResults;

        } catch (error) {
            throw new Error('Failed to settle expenses');
        }
    }
}
