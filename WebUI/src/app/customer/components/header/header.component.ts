import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { OrderService } from 'src/app/services/http/order.service';
import { TicketService } from 'src/app/services/http/ticket.service';
import { DialogConfirmSevice } from 'src/app/services/loading/dialog_confirm';
import { LoadingPanel } from 'src/app/services/loading/loading-panel';
import { DialogConfirmComponent } from '../../../components/dialog-confirm/dialog-confirm.component';
import { IUser } from '../../../models/user';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @Input() userInfo: IUser | any;
  @Input() title: any;

  protected orderingCount: number = 0;
  private ticketService: TicketService;
  private orderService: OrderService;
  private confirmDialog: DialogConfirmSevice;
  private loadingPanel: LoadingPanel;
  constructor(dialog: MatDialog, http: HttpClient, private router: Router) {
    this.confirmDialog = new DialogConfirmSevice(dialog);
    this.loadingPanel = new LoadingPanel(dialog);
    this.orderService = new OrderService(http);
    this.ticketService = new TicketService(http);
  }

  ngOnInit(): void {
    this.getQuantityOfFoodsOrdering();
  }
  getQuantityOfFoodsOrdering() {
    this.ticketService.getGetPendingTicket(this.userInfo.id).subscribe((ticket) => {
      this.orderService.getListWithTicketId(ticket.id).subscribe((orderingList) => {
        this.orderingCount = <number>orderingList.count;
      })
    })
  }
  async logout() {
    let isConfirm = await this.confirmDialog.show("confirm_logout");
    isConfirm.subscribe((result: any) => {
      if (result) {
        this.loadingPanel.show();
        this.router.navigate(['/login']);
        this.loadingPanel.hide();
      }
    });

  }

}
