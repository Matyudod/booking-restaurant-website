import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { ConfigService } from "src/app/configs/config.service";
import { IMessage } from 'src/app/models/message';
import { IOrder } from 'src/app/models/order';
import { IOrderList } from 'src/app/models/order-list';
@Injectable()
export class OrderService {
  constructor(private http: HttpClient) { }
  url = new ConfigService().url + '/api/order';

  order(order: IOrder): Observable<IMessage | any> {
    return this.http.post<IMessage>(this.url + '/create', order);
  }

  getListWithTicketId(ticket_id: Number): Observable<IOrderList> {
    return this.http.get<any>(this.url + '/get-order/' + ticket_id);
  }


}

