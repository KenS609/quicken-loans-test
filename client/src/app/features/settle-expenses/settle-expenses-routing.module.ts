import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SettleExpensesComponent } from './settle-expenses.component';

const routes: Routes = [
  {
    path: '',
    component: SettleExpensesComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SettleExpensesRoutingModule { }
