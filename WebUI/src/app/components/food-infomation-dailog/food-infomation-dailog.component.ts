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
import { ITicketCreate } from 'src/app/models/ticket-create';
import { UserService } from 'src/app/services/http/user.service';

@Component({
  selector: 'app-food-infomation-dailog',
  templateUrl: './food-infomation-dailog.component.html',
  styleUrls: ['./food-infomation-dailog.component.scss']
})
export class FoodInfomationDailogComponent implements OnInit {

  private userToken: String;
  private ticketService: TicketService;
  private userService: UserService;
  private orderService: OrderService;
  private loadingPanel: LoadingPanel;
  protected ticketOrderId: Number = 0;
  protected ticketReserveId: Number = 0;
  protected ticketReserveTableId: Number = 0;
  constructor(@Inject(MAT_DIALOG_DATA) public foodDetail: IFoodDetail, http: HttpClient, dialog: MatDialog) {
    this.ticketService = new TicketService(http);
    this.orderService = new OrderService(http);
    this.userService = new UserService(http);
    this.loadingPanel = new LoadingPanel(dialog);
    this.userToken = <string>localStorage.getItem('SessionID') as string;
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
    this.foodId.setValue(this.foodDetail.food.id);
    this.getPendingTicket();
  }
  getPendingTicket() {
    this.userService.getIdByToken(this.userToken).subscribe((userID: Number | any) => {
      this.ticketService.getPendingOrderTicketOfCustomer(this.foodDetail.userId).subscribe((ticketOrder: ITicket) => {
        if (ticketOrder != null) {
          this.ticketOrderId = ticketOrder.id;
        } else {
          let ticketCreate: ITicketCreate = {
            customer_address: '',
            customer_id: userID,
            customer_phone: '',
            payment_date: null,
            received_date: new Date(),
            table_id: 0,
            type_party_id: 0,
          }
          this.ticketService.createTicket(ticketCreate).subscribe((ticketOrder: ITicket | any) => {
            this.ticketOrderId = ticketOrder.id;
          });
        }

        this.ticketService.getPendingReserveTicketOfCustomer(this.foodDetail.userId).subscribe((ticketReserve: ITicket) => {
          if (ticketReserve != null) {
            this.ticketReserveId = ticketReserve.id;
            this.ticketReserveTableId = ticketReserve.table_id;
          }
        });
      });
    });
  }
  formatNumber(number: Number) {
    return new Intl.NumberFormat('vi', { style: "currency", currency: "VND" }).format(number as number);
  }

  onSubmit() {

  }
  orderToHome() {
    this.ticketId.setValue(this.ticketOrderId);
    this.loadingPanel.show();
    this.orderService.order(<IOrder>this.orderForm.value).subscribe((result) => {
      this.loadingPanel.hide();
    })
  }
  orderForTable() {
    this.ticketId.setValue(this.ticketReserveId);
    this.loadingPanel.show();
    this.orderService.order(<IOrder>this.orderForm.value).subscribe((result) => {
      this.loadingPanel.hide();
    })
  }
}
