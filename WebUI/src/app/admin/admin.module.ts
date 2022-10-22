import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { HeaderComponent } from './components/header/header.component';
import { MaterialModule } from '../modules/material/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgImageSliderModule } from 'ng-image-slider';
import { FooterComponent } from './components/footer/footer.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { CustomerListPageComponent } from './views/customer-list-page/customer-list-page.component';
import { OrderListPageComponent } from './views/order-list-page/order-list-page.component';
import { EmployeeListPageComponent } from './views/employee-list-page/employee-list-page.component';
import { FoodListPageComponent } from './views/food-list-page/food-list-page.component';


@NgModule({
  declarations: [
    AdminComponent,
    HeaderComponent,
    FooterComponent,
    DashboardComponent,
    CustomerListPageComponent,
    OrderListPageComponent,
    EmployeeListPageComponent,
    FoodListPageComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgImageSliderModule
  ]
})
export class AdminModule { }
