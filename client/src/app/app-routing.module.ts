import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'settle-expenses',
    pathMatch: 'full'
  },
  {
    path: 'settle-expenses',
    loadChildren: () => import('./features/settle-expenses/settle-expenses.module').then(m => m.SettleExpensesModule)
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
