import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CustomersComponent } from './customer/customers/customers.component';
import { AddcustomersComponent } from './customer/addcustomers/addcustomers.component';

const routes: Routes = [
  { path: '', redirectTo: '/listcustomer', pathMatch: 'full' },
  { path: 'listcustomer', component: CustomersComponent },
  { path: 'addcustomer', component: AddcustomersComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
