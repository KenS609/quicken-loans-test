import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../../material.module';

import { SettleExpensesRoutingModule } from './settle-expenses-routing.module';
import { SettleExpensesComponent } from './settle-expenses.component';

import {
  AddUserComponent,
  AddExpenseComponent,
  UserDetailComponent,
  ReportComponent
} from './components';

import { StoreModule, } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import * as fromExpenses from './store/settle-expenses.reducer';
import { SettleExpensesEffects } from './store/settle-expenses.effects';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    UserDetailComponent,
    AddUserComponent,
    AddExpenseComponent,
    ReportComponent,
    SettleExpensesComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    SettleExpensesRoutingModule,
    StoreModule.forFeature(fromExpenses.settleExpensesFeatureKey, fromExpenses.reducer),
    EffectsModule.forFeature([
      SettleExpensesEffects
    ])
  ],
  entryComponents: [
    AddUserComponent
  ]
})
export class SettleExpensesModule { }
