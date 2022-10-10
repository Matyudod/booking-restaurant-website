import { AfterContentChecked, AfterViewChecked, Component, OnInit, ViewChild } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { IUser } from '../models/user';
import { OrderService } from 'src/app/services/http/order.service';
import { TicketService } from 'src/app/services/http/ticket.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.scss']
})
export class CustomerComponent implements OnInit {



  orderingCount: number = 0;
  userInfo: any = null;
  title: any = "";
  private ticketService: TicketService;
  private orderService: OrderService;
  constructor(private router: Router, http: HttpClient) {

    this.orderService = new OrderService(http);
    this.ticketService = new TicketService(http);
    this.userInfo = JSON.parse(<string>localStorage.getItem('userInfo')) as IUser;
    this.title = <string>localStorage.getItem('title') as String;
    localStorage.clear()
    localStorage.setItem("SessionID", this.userInfo.refreshToken);
    if (this.userInfo == null) {
      this.router.navigate(['/login']);
    }
    router.events.subscribe((val) => {
      // see also 
      if (val instanceof NavigationEnd) {
        this.getQuantityOfFoodsOrdering();
      }
    });
  }
  changeComponent(value: any) {
    // this.getQuantityOfFoodsOrdering();
    console.log("a");
  }
  ngOnInit(): void {
  }
  getQuantityOfFoodsOrdering() {
    this.ticketService.getGetPendingTicket(this.userInfo.id).subscribe((ticket) => {
      this.orderService.getListWithTicketId(ticket.id).subscribe((orderingList) => {
        this.orderingCount = <number>orderingList.count;
      })
    })
  }
}
