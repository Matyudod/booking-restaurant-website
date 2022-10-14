import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { ConfigService } from "src/app/configs/config.service";
import { IMessage } from 'src/app/models/message';
import { IBillResponse } from 'src/app/models/bill-response';
@Injectable()
export class BillService {
  constructor(private http: HttpClient) { }
  url = new ConfigService().url + '/api/bill';

  getByTicketId(ticket_id: Number): Observable<IMessage | any> {
    return this.http.get<IMessage>(this.url + '/is-paid/' + ticket_id);
  }

  createBill(ticket_id: Number): Observable<IBillResponse | IMessage | any> {
    let bill = {
      ticket_id: ticket_id,
      admin_id: 0,
      discount_id: 0
    }
    return this.http.post<IBillResponse | IMessage>(this.url + '/create/', bill);
  }

  cancel(bill_id: Number): Observable<IMessage | any> {
    return this.http.delete<IMessage>(this.url + '/delete/' + bill_id);
  }

}

