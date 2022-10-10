import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { ConfigService } from "src/app/configs/config.service";
import { IMessage } from 'src/app/models/message';
import { ITicket } from 'src/app/models/ticket';
import { ITicketCreate } from 'src/app/models/ticket-create';
import { ITicketOrderdList } from 'src/app/models/ticket-ordered-list';
@Injectable()
export class TicketService {
  constructor(private http: HttpClient) { }
  url = new ConfigService().url + '/api/ticket';

  getGetPendingTicket(userId: Number): Observable<ITicket | IMessage | any> {
    return this.http.get<ITicket | IMessage>(this.url + '/get-pending/' + userId);
  }

  order(id: Number, ticket: ITicketCreate): Observable<IMessage | any> {
    return this.http.put<ITicket | IMessage>(this.url + '/update/' + id, ticket);
  }

  getGetOrderedTicket(userId: Number): Observable<ITicketOrderdList | IMessage | any> {
    return this.http.get<ITicketOrderdList | IMessage>(this.url + '/get-orderd/' + userId);
  }
}

