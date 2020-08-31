import { ArrayNotEmpty, ArrayMinSize } from 'class-validator';
import { Expense } from './expense.model';


export class CalculateExpense {

    @ArrayNotEmpty({
        message: 'Please provide expenses to settle'
    })
    @ArrayMinSize(2, {
        message: 'Please provide minimum 2 expenses to settle',
    })
    expenses: Array<Expense>;
}