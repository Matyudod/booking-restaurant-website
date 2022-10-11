import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ICart } from 'src/app/models/cart';
import { ICartItem } from 'src/app/models/cart-item';
import { ICity } from 'src/app/models/city';
import { IFood } from 'src/app/models/food';
import { IOrder } from 'src/app/models/order';
import { ITicket } from 'src/app/models/ticket';
import { ITicketCreate } from 'src/app/models/ticket-create';
import { ITicketOrderdList } from 'src/app/models/ticket-ordered-list';
import { FoodService } from 'src/app/services/http/food.service';
import { OrderService } from 'src/app/services/http/order.service';
import { PublicFileService } from 'src/app/services/http/public-file.service';
import { TicketService } from 'src/app/services/http/ticket.service';
import { UserService } from 'src/app/services/http/user.service';
import { DialogSevice } from 'src/app/services/loading/dialog';
import { DialogConfirmSevice } from 'src/app/services/loading/dialog_confirm';
import { LoadingPanel } from 'src/app/services/loading/loading-panel';
import { IUser } from '../../../models/user';
import { TableService } from '../../../services/http/table.service';
import { TypePartyService } from '../../../services/http/type-of-party.service';

@Component({
  selector: 'app-cart-history-page',
  templateUrl: './cart-history-page.component.html',
  styleUrls: ['./cart-history-page.component.scss']
})
export class CartHistoryPageComponent implements OnInit {

  private userId: Number | any;
  private userToken: String;
  private foodService: FoodService;
  private typePartyService: TypePartyService;
  private userService: UserService;
  private orderService: OrderService;
  private tableService: TableService;
  private publicFileService: PublicFileService;
  private ticketService: TicketService;


  protected orderedList: ITicketOrderdList = {
    count: 0,
    rows: []
  };
  private dialogService: DialogSevice;
  private loadingPanel: LoadingPanel;
  private confirmDialog: DialogConfirmSevice;
  constructor(http: HttpClient, dialog: MatDialog, private router: Router) {
    this.dialogService = new DialogSevice(dialog);
    this.loadingPanel = new LoadingPanel(dialog);
    this.confirmDialog = new DialogConfirmSevice(dialog);
    this.typePartyService = new TypePartyService(http);
    this.foodService = new FoodService(http);
    this.orderService = new OrderService(http);
    this.tableService = new TableService(http);
    this.publicFileService = new PublicFileService(http);
    this.ticketService = new TicketService(http);
    this.userService = new UserService(http);
    this.userToken = <string>localStorage.getItem('SessionID') as string;
  }

  ngOnInit(): void {
    this.orderedList = {
      count: 0,
      rows: []
    };
    this.userService.getIdByToken(this.userToken).subscribe((userID) => {
      this.userId = userID;
      this.getOderedList();
    })
  }

  getOderedList() {
    this.ticketService.getGetOrderedTicket(this.userId).subscribe((ticketOrderedList) => {
      let promise = new Promise((resolveOuter) => {
        ticketOrderedList.rows.forEach((ticketOrdered: any, index: Number) => {
          resolveOuter(this.userService.getInfo(ticketOrdered.customer_id).subscribe((user: any) => {
            ticketOrderedList.rows[<number>index].customer = user;
            delete ticketOrderedList.rows[<number>index].customer_id;
            resolveOuter(this.tableService.getTableInfo(ticketOrdered.table_id).subscribe(table => {
              ticketOrderedList.rows[<number>index].table = table;
              delete ticketOrderedList.rows[<number>index].table_id;
              resolveOuter(this.typePartyService.getTableInfo(ticketOrdered.type_party_id).subscribe((type_party) => {
                ticketOrderedList.rows[<number>index].type_party = type_party;
                delete ticketOrderedList.rows[<number>index].type_party_id;
              }))
            }));
          }));
        });
      });
      promise.then(() => {
        this.orderedList = ticketOrderedList;

      })
    })
  }

}
