import { Controller, Post, Body, ValidationPipe, HttpCode } from '@nestjs/common';
import { CalculateExpense } from './expense.validation';
import { ExpenseService } from './expense.service';
import { SettledExpense } from './expense.model';

@Controller('api/v1/expenses')
export class ExpenseController {

    constructor(
        private expenseService: ExpenseService
    ) { }

    @Post('settle')
    @HttpCode(200)
    create(@Body(new ValidationPipe()) body: CalculateExpense): Array<SettledExpense> {
        return this.expenseService.settleExpenses(body.expenses);
    }
}
