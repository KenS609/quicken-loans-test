import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { FormValidators } from 'src/app/shared/services';
import { Expense } from '../../models/expenses.model';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-add-expense',
  templateUrl: './add-expense.component.html',
  styleUrls: ['./add-expense.component.scss']
})
export class AddExpenseComponent implements OnInit {

  form: FormGroup;
  today = new Date();
  expenseOperationText = 'Add';

  constructor(
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public expenseData: Expense,
  ) {
    this.form = this.fb.group({
      id: null,
      amount: [1.00, [Validators.required, Validators.min(1), FormValidators.amountValidator]],
      date: [this.today, [Validators.required]],
      description: [null]
    });

    if (expenseData) {
      this.expenseOperationText = 'Update';
      this.form.patchValue(expenseData);
    }
  }

  ngOnInit(): void {
  }

}
