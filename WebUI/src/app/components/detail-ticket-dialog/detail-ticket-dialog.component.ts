import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { IBill } from 'src/app/models/bill';
import { ICart } from 'src/app/models/cart';
import { ICartItem } from 'src/app/models/cart-item';
import { IComment } from 'src/app/models/comment';
import { IFood } from 'src/app/models/food';
import { IMessage } from 'src/app/models/message';
import { IOrder } from 'src/app/models/order';
import { ITable } from 'src/app/models/table';
import { ITicket } from 'src/app/models/ticket';
import { ITicketInfo } from 'src/app/models/ticket-info';
import { BillService } from 'src/app/services/http/bill.service';
import { CommentService } from 'src/app/services/http/comment.service';
import { FoodService } from 'src/app/services/http/food.service';
import { OrderService } from 'src/app/services/http/order.service';
import { PublicFileService } from 'src/app/services/http/public-file.service';
import { TableService } from 'src/app/services/http/table.service';
import { TicketService } from 'src/app/services/http/ticket.service';
import { TypePartyService } from 'src/app/services/http/type-of-party.service';
import { UserService } from 'src/app/services/http/user.service';
import { DialogSevice } from 'src/app/services/loading/dialog';
import { DialogCommentSevice } from 'src/app/services/loading/dialog_comment';
import { DialogConfirmSevice } from 'src/app/services/loading/dialog_confirm';
import { LoadingPanel } from 'src/app/services/loading/loading-panel';

@Component({
  selector: 'app-detail-ticket-dialog',
  templateUrl: './detail-ticket-dialog.component.html',
  styleUrls: ['./detail-ticket-dialog.component.scss']
})
export class DetailTicketDialogComponent implements OnInit {
  private foodService: FoodService;
  private commentService: CommentService;
  private typePartyService: TypePartyService;
  private userService: UserService;
  private orderService: OrderService;
  private tableService: TableService;
  private billService: BillService;
  private publicFileService: PublicFileService;
  private ticketService: TicketService;
  private dialogService: DialogSevice;
  private loadingPanel: LoadingPanel;
  private confirmDialog: DialogConfirmSevice;
  private commentDialog: DialogCommentSevice;
  protected ticketInfo: ITicketInfo | any;

  protected foodList: ICart = {
    countAll: 0,
    rows: []
  };
  constructor(@Inject(MAT_DIALOG_DATA) public ticketId: Number, http: HttpClient, dialog: MatDialog, private router: Router) {
    this.dialogService = new DialogSevice(dialog);
    this.loadingPanel = new LoadingPanel(dialog);
    this.confirmDialog = new DialogConfirmSevice(dialog);
    this.commentDialog = new DialogCommentSevice(dialog);
    this.typePartyService = new TypePartyService(http);
    this.foodService = new FoodService(http);
    this.commentService = new CommentService(http);
    this.orderService = new OrderService(http);
    this.tableService = new TableService(http);
    this.publicFileService = new PublicFileService(http);
    this.billService = new BillService(http);
    this.ticketService = new TicketService(http);
    this.userService = new UserService(http);
  }

  ngOnInit(): void {
    this.getTicketInfo()
  }
  getTicketInfo() {
    this.ticketService.getByTicketId(this.ticketId).subscribe((ticketInfo: ITicket | any) => {
      this.getListOrdering(<ITicket>ticketInfo);
      let promise = new Promise((resolve, reject) => {
        this.userService.getInfo(ticketInfo.customer_id).subscribe((user: any) => {
          ticketInfo.customer = user;
          delete ticketInfo.customer_id;
          this.tableService.getTableInfo(ticketInfo.table_id).subscribe((table: ITable) => {
            ticketInfo.table = table;
            delete ticketInfo.table_id;
            this.typePartyService.getTableInfo(ticketInfo.type_party_id).subscribe((type_party) => {
              ticketInfo.type_party = type_party;
              delete ticketInfo.type_party_id;
              this.billService.getByTicketId(ticketInfo.id).subscribe((bill: IBill) => {
                ticketInfo.bill = bill;
                if (bill == null) {
                  ticketInfo.status = 0;
                  ticketInfo.comment = null;
                } else {
                  if (bill.status) {
                    ticketInfo.status = 1;
                    this.commentService.getCommentWithBillId(bill.id).subscribe((comment: IComment | IMessage | any) => {
                      if (comment.message != undefined) {
                        ticketInfo.comment = {
                          id: 0,
                          bill_id: 0,
                          content: '',
                          point: 0,
                          createdAt: new Date(),
                          updatedAt: new Date()
                        };
                      } else {
                        ticketInfo.comment = comment;
                      }
                    })
                  } else {
                    ticketInfo.status = -1;
                    ticketInfo.comment = null;
                  }
                }
              })
            })
          });
        });
        resolve(ticketInfo);
      })
      promise.then(() => {
        this.ticketInfo = ticketInfo;
        console.log(this.ticketInfo);

      })
    })
  }
  getListOrdering(ticket: ITicket) {
    this.orderService.getListWithTicketId(ticket.id).subscribe((orderingList) => {
      orderingList.rows.forEach((orderingItem: IOrder, index: number) => {
        this.foodService.getById(orderingItem.food_id).subscribe((food) => {
          this.foodList.countAll = orderingList.count;
          let foodItem: ICartItem = {
            quantity: orderingItem.quantity,
            ticket: ticket,
            food: <IFood>food
          }
          this.foodList.rows.push(foodItem);
        });
      });
    });
  }
  formatNumber(price: Number, quantity: Number = 1) {
    let number = <number>price * <number>quantity;
    return new Intl.NumberFormat('vi', { style: "currency", currency: "VND" }).format(number);
  }
  renderStatus(status: Number) {
    if (status == 0) {
      return "Pending";
    } else if (status == 1) {
      return "Completed";
    } else {
      return "Canceled";
    }
  }
  renderDate(date: String | any) {
    if (date != undefined) {
      let datetime = new Date(date);
      return datetime.toLocaleDateString()
    }
    else return '';
  }
  renderTime(date: String | any) {
    if (date != undefined) {
      let datetime = new Date(date);
      return datetime.toLocaleTimeString()
    }
    else return '';
  }
  renderScore(comment: IComment | any) {
    return comment != null ? 'Score: ' + comment.point : '';
  }
  renderComment(comment: IComment | any) {
    return comment != null ? comment.content : '';
  }
  sumTotal(cartlist: ICartItem[]) {
    let total = 0;
    cartlist.forEach(foodItem => {
      total += <number>foodItem.food.price * <number>foodItem.quantity;
    });
    return this.formatNumber(total);
  }
}