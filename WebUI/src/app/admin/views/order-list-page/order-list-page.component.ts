import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/http/user.service';
import { IPagination } from '../../../models/pagination';
import { IUserList } from '../../../models/user-list';
import { IMessage } from '../../../models/message';
import { MatTableDataSource } from '@angular/material/table';
import { DialogConfirmSevice } from 'src/app/services/loading/dialog_confirm';
import { LoadingPanel } from 'src/app/services/loading/loading-panel';
import { MatDialog } from '@angular/material/dialog';
import { DialogSevice } from '../../../services/loading/dialog';
import { MatSort, Sort } from '@angular/material/sort';
import { IFoodList } from 'src/app/models/food-list';
import { FoodService } from 'src/app/services/http/food.service';
import { MainIngredientDetailService } from 'src/app/services/http/main-ingredient-detail.service';
import { IFood } from '../../../models/food';
import { FoodInfoDialogSevice } from '../../../services/loading/food_info_dialog';
import { IMainIngredientDetail } from 'src/app/models/main-ingredient-detail';
import { DialogFoodFormAddOrCreateSevice } from 'src/app/services/loading/dialog_food_form_add_or_create';
import { TicketService } from '../../../services/http/ticket.service';
import { CommentService } from 'src/app/services/http/comment.service';
import { TypePartyService } from 'src/app/services/http/type-of-party.service';
import { OrderService } from 'src/app/services/http/order.service';
import { TableService } from 'src/app/services/http/table.service';
import { BillService } from 'src/app/services/http/bill.service';
import { PublicFileService } from 'src/app/services/http/public-file.service';
import { ITicketOrderdList } from 'src/app/models/ticket-ordered-list';
import { DialogFoodDetailSevice } from 'src/app/services/loading/dialog_detail_ticket';
import { DialogCommentSevice } from 'src/app/services/loading/dialog_comment';
import { ITable } from 'src/app/models/table';
import { IBill } from 'src/app/models/bill';
import { IComment } from 'src/app/models/comment';

@Component({
  selector: 'app-order-list-page',
  templateUrl: './order-list-page.component.html',
  styleUrls: ['./order-list-page.component.scss']
})
export class OrderListPageComponent implements OnInit {

  @ViewChild(MatSort) sort!: MatSort;
  private userService: UserService;
  public pagination: IPagination;
  private foodService: FoodService;
  private commentService: CommentService;
  private typePartyService: TypePartyService;
  private orderService: OrderService;
  private tableService: TableService;
  private billService: BillService;
  private publicFileService: PublicFileService;
  private ticketService: TicketService;


  protected orderedList: ITicketOrderdList = {
    count: 0,
    rows: []
  };
  protected length: number = 0;
  private dialogService: DialogSevice;
  private loadingPanel: LoadingPanel;
  private confirmDialog: DialogConfirmSevice;
  private foodDetailDialog: DialogFoodDetailSevice;
  private commentDialog: DialogCommentSevice;
  displayedColumns: string[] = ['id', 'customer-name', 'received-date', 'phone', 'address', 'status', 'comment', 'detail', 'action'];
  dataSource = new MatTableDataSource([])
  private mainIngredientDetailService: MainIngredientDetailService;
  constructor(dialog: MatDialog, private router: Router, http: HttpClient) {
    this.dialogService = new DialogSevice(dialog);
    this.foodDetailDialog = new DialogFoodDetailSevice(dialog);
    this.loadingPanel = new LoadingPanel(dialog);
    this.confirmDialog = new DialogConfirmSevice(dialog);
    this.commentDialog = new DialogCommentSevice(dialog);
    this.typePartyService = new TypePartyService(http);
    this.mainIngredientDetailService = new MainIngredientDetailService(http);
    this.foodService = new FoodService(http);
    this.commentService = new CommentService(http);
    this.orderService = new OrderService(http);
    this.tableService = new TableService(http);
    this.publicFileService = new PublicFileService(http);
    this.billService = new BillService(http);
    this.ticketService = new TicketService(http);
    this.userService = new UserService(http);
    this.pagination = {
      page: 1,
      size: 10,
      field: null,
      is_reverse_sort: null,
    }
  }

  ngAfterViewInit() {
  }
  ngOnInit(): void {
    this.getOderedList();
  }
  getOderedList() {
    this.ticketService.getGetOrderedListForAdmin(this.pagination).subscribe((ticketOrderedList) => {
      let promise = new Promise((resolveOuter) => {
        ticketOrderedList.rows.forEach((ticketOrdered: any, index: Number) => {
          resolveOuter(this.userService.getInfo(ticketOrdered.customer_id).subscribe((user: any) => {
            ticketOrderedList.rows[<number>index].customer = user;
            delete ticketOrderedList.rows[<number>index].customer_id;
            resolveOuter(this.tableService.getTableInfo(ticketOrdered.table_id).subscribe((table: ITable) => {
              ticketOrderedList.rows[<number>index].table = table;
              delete ticketOrderedList.rows[<number>index].table_id;
              resolveOuter(this.typePartyService.getTableInfo(ticketOrdered.type_party_id).subscribe((type_party) => {
                ticketOrderedList.rows[<number>index].type_party = type_party;
                delete ticketOrderedList.rows[<number>index].type_party_id;
                resolveOuter(
                  this.billService.getByTicketId(ticketOrdered.id).subscribe((bill: IBill) => {
                    ticketOrderedList.rows[<number>index].bill = bill;
                    if (bill == null) {
                      ticketOrderedList.rows[<number>index].status = 0;
                      ticketOrderedList.rows[<number>index].comment = null;
                    } else {
                      if (bill.status) {
                        ticketOrderedList.rows[<number>index].status = 1;
                        this.commentService.getCommentWithBillId(bill.id).subscribe((comment: IComment | IMessage | any) => {
                          if (comment.message != undefined) {
                            ticketOrderedList.rows[<number>index].comment = {
                              id: 0,
                              bill_id: 0,
                              content: '',
                              point: 0,
                              createdAt: new Date(),
                              updatedAt: new Date()
                            };
                          } else {
                            ticketOrderedList.rows[<number>index].comment = comment;
                          }
                        })
                      } else {
                        ticketOrderedList.rows[<number>index].status = -1;
                        ticketOrderedList.rows[<number>index].comment = null;
                      }
                    }

                  })
                )
              }))
            }));
          }));
        });
      });
      promise.then(() => {
        this.orderedList = ticketOrderedList;
        this.length = <number>ticketOrderedList.count;
        this.dataSource.data = ticketOrderedList.rows;
        console.log(ticketOrderedList);
      })
    })
  }
  renderDate(date: String | any) {
    if (date != undefined) {
      let datetime = new Date(date);
      return datetime.toLocaleDateString()
    }
    else return '';
  }
  async deleteCustomer(customerId: Number) {
    let isConfirm = await this.confirmDialog.show("confirm_delete");
    isConfirm.subscribe((result: any) => {
      if (result) {
        // this.loadingPanel.show();
        // this.foodService.delete(customerId).subscribe((message: IMessage) => {
        //   this.loadingPanel.hide();
        //   this.ngOnInit();
        //   this.dialog.show(message);
        // })
      }
    });
  }

  loadPageData(page: any) {
    this.pagination.page = page?.pageIndex + 1;
    this.ngOnInit();
  }
  announceSortChange(sortState: Sort) {

    if (sortState.direction) {
      this.pagination.field = sortState.active;
      this.pagination.is_reverse_sort = sortState.direction == 'desc' ? "true" : "false";
    } else {
      this.pagination.field = null;
      this.pagination.is_reverse_sort = null;
    }
    this.ngOnInit();
  }

}
