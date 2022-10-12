import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomerComponent } from './customer.component';
import { CartHistoryPageComponent } from './views/cart-history-page/cart-history-page.component';
import { CartPageComponent } from './views/cart-page/cart-page.component';
import { HomePageComponent } from './views/home-page/home-page.component';
import { MenuPageComponent } from './views/menu-page/menu-page.component';

const routes: Routes = [
  {
    path: '',
    component: CustomerComponent,
    children: [
      {
        path: 'menu',
        component: MenuPageComponent
      },
      {
        path: 'cart-history',
        component: CartHistoryPageComponent
      },
      {
        path: 'cart',
        component: CartPageComponent
      },
      {
        path: '',
        component: HomePageComponent
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomerRoutingModule { }