import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CustomerRoutingModule } from './customer-routing.module';
import { CustomerComponent } from './customer.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { MaterialModule } from '../modules/material/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HomePageComponent } from './views/home-page/home-page.component';
import { ListsCardFoodComponent } from './components/lists-card-food/lists-card-food.component';
import { GridImageComponent } from './components/grid-image/grid-image.component';
import { GridContentComponent } from './components/grid-content/grid-content.component';
import { MenuPageComponent } from './views/menu-page/menu-page.component';
import { CartPageComponent } from './views/cart-page/cart-page.component';
import { CartHistoryPageComponent } from './views/cart-history-page/cart-history-page.component';


@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    CustomerComponent,
    HomePageComponent,
    ListsCardFoodComponent,
    GridImageComponent,
    GridContentComponent,
    MenuPageComponent,
    CartPageComponent,
    CartHistoryPageComponent,
  ],
  imports: [
    CommonModule,
    CustomerRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [CustomerComponent]
})
export class CustomerModule { }
