import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import { CustomerListPageComponent } from './views/customer-list-page/customer-list-page.component';
import { OrderListPageComponent } from './views/order-list-page/order-list-page.component';
import { EmployeeListPageComponent } from './views/employee-list-page/employee-list-page.component';
import { FoodListPageComponent } from './views/food-list-page/food-list-page.component';

const routes: Routes = [{
  path: '',
  component: AdminComponent,
  children: [
    {
      path: 'order-list',
      component: OrderListPageComponent
    },
    {
      path: 'food-list',
      component: FoodListPageComponent
    },
    {
      path: 'employee-list',
      component: EmployeeListPageComponent
    },
    {
      path: 'customer-list',
      component: CustomerListPageComponent
    },
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
