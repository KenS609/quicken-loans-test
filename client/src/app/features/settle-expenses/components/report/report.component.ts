import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SettledExpense } from '../../models/expenses.model';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss']
})
export class ReportComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public settledExpenses: SettledExpense[],
  ) { }

  ngOnInit(): void {
  }

  trackByIndex(index: number): number {
    return index;
  }

}
