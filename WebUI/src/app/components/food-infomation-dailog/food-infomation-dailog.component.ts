import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IFood } from 'src/app/models/food';
import { IMainIngredientDetail } from 'src/app/models/main-ingredient-detail';
import { OrderService } from 'src/app/services/http/order.service';
import { TicketService } from 'src/app/services/http/ticket.service';
import { IFoodDetail } from '../../models/food-detail';
import { ITicket } from '../../models/ticket';
import { IOrder } from '../../models/order';
import { LoadingPanel } from 'src/app/services/loading/loading-panel';

@Component({
  selector: 'app-food-infomation-dailog',
  templateUrl: './food-infomation-dailog.component.html',
  styleUrls: ['./food-infomation-dailog.component.scss']
})
export class FoodInfomationDailogComponent implements OnInit {

  private ticketService: TicketService;
  private orderService: OrderService;
  private loadingPanel: LoadingPanel;
  constructor(@Inject(MAT_DIALOG_DATA) public foodDetail: IFoodDetail, http: HttpClient, dialog: MatDialog) {
    this.ticketService = new TicketService(http);
    this.orderService = new OrderService(http);
    this.loadingPanel = new LoadingPanel(dialog);
  }
  foodId = new FormControl(<Number>0, [
    Validators.required,
  ]);
  ticketId = new FormControl(<Number>0, [
    Validators.required,
  ]);
  quantity = new FormControl(<Number>1, [
    Validators.required,
  ]);
  orderForm = new FormGroup({
    food_id: this.foodId,
    ticket_id: this.ticketId,
    quantity: this.quantity,
  },);
  ngOnInit(): void {
    this.getPendingTicket();
  }

  getPendingTicket() {
    this.ticketService.getGetPendingTicket(this.foodDetail.userId).subscribe((ticket: ITicket) => {
      this.ticketId.setValue(ticket.id);
      this.foodId.setValue(this.foodDetail.food.id);
    })
  }
  formatNumber(number: Number) {
    return new Intl.NumberFormat('vi', { style: "currency", currency: "VND" }).format(number as number);
  }

  onSubmit() {
    this.loadingPanel.show();
    this.orderService.order(<IOrder>this.orderForm.value).subscribe((result) => {
      this.loadingPanel.hide();
    })
  }
}
