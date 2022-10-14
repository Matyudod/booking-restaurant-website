import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ITable } from 'src/app/models/table';
import { FoodService } from 'src/app/services/http/food.service';
import { OrderService } from 'src/app/services/http/order.service';
import { PublicFileService } from 'src/app/services/http/public-file.service';
import { TicketService } from 'src/app/services/http/ticket.service';
import { UserService } from 'src/app/services/http/user.service';
import { DialogSevice } from 'src/app/services/loading/dialog';
import { DialogConfirmSevice } from 'src/app/services/loading/dialog_confirm';
import { LoadingPanel } from 'src/app/services/loading/loading-panel';
import { TableService } from '../../../services/http/table.service';
import { ITableList } from '../../../models/table-list';
import { ICartItem } from 'src/app/models/cart-item';
import { ITicket } from '../../../models/ticket';
import { async } from '@angular/core/testing';
import { IMessage } from '../../../models/message';

@Component({
  selector: 'app-reserve-table-view',
  templateUrl: './reserve-table-view.component.html',
  styleUrls: ['./reserve-table-view.component.scss']
})
export class ReserveTableViewComponent implements OnInit {

  tableId = new FormControl('', [
    Validators.required,
  ]);
  receivedDate = new FormControl('', [
    Validators.required
  ]);
  reserveForm = new FormGroup({
    table_id: this.tableId,
    received_date: this.receivedDate,
  },);
  protected ticket: ITicket | any;
  public tablesList: ITable[] = [];
  public imageObject: Array<object> = [
    {
      image: '/assets/images/panel3.png',
      thumbImage: '/assets/images/panel3.png',
      order: 0
    }, {
      image: '/assets/images/panel2.png',
      thumbImage: '/assets/images/panel2.png'
    },
    {
      image: '/assets/images/panel1.png',
      thumbImage: '/assets/images/panel1.png',
    }, {
      image: '/assets/images/panel4.png',
      thumbImage: '/assets/images/panel4.png',
    },
  ];
  private userId: Number | any;
  private userToken: String;
  private foodService: FoodService;
  private userService: UserService;
  private orderService: OrderService;
  private publicFileService: PublicFileService;
  private ticketService: TicketService;
  private tableService: TableService;
  private dialogService: DialogSevice;
  private loadingPanel: LoadingPanel;
  private confirmDialog: DialogConfirmSevice;
  minDate: Date;
  constructor(http: HttpClient, dialog: MatDialog, private router: Router) {
    this.dialogService = new DialogSevice(dialog);
    this.loadingPanel = new LoadingPanel(dialog);
    this.confirmDialog = new DialogConfirmSevice(dialog);
    this.foodService = new FoodService(http);
    this.tableService = new TableService(http);
    this.orderService = new OrderService(http);
    this.publicFileService = new PublicFileService(http);
    this.ticketService = new TicketService(http);
    this.userService = new UserService(http);
    this.userToken = <string>localStorage.getItem('SessionID') as string;
    const currentYear = new Date();
    this.minDate = new Date(currentYear.getFullYear(), currentYear.getMonth(), currentYear.getDate());
  }

  ngOnInit(): void {
    this.userService.getIdByToken(this.userToken).subscribe((userID) => {
      this.userId = userID;
      this.getTableList();
      this.getTicketPending();
    })
  }
  getTableList() {
    this.tableService.getList().subscribe((tablesList: ITableList) => {
      this.tablesList = tablesList.rows;
    })
  }
  getTicketPending() {
    this.ticketService.getGetPendingTicket(this.userId).subscribe((ticket: ITicket) => {
      this.ticket = ticket;
    });

  }
  async onSubmit() {
    let message: String = 'confirm_reserve';
    let isClose = await this.confirmDialog.show(message);
    isClose.subscribe((isConfirm: Boolean) => {
      if (isConfirm) {
        this.ticket.table_id = this.reserveForm.value.table_id;
        this.ticket.received_date = this.reserveForm.value.received_date;
        this.loadingPanel.show();
        this.ticketService.reserveTable(this.ticket).subscribe(() => {
          this.loadingPanel.hide();
          this.ngOnInit();
        });
      }
    })
  }

}