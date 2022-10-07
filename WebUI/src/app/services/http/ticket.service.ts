import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { ConfigService } from "src/app/configs/config.service";
import { IMessage } from 'src/app/models/message';
import { ITicket } from 'src/app/models/ticket';
@Injectable()
export class TicketService {
  constructor(private http: HttpClient) { }
  url = new ConfigService().url + '/api/ticket';

  getGetPendingTicket(userId: Number): Observable<ITicket | IMessage | any> {
    return this.http.get<ITicket | IMessage>(this.url + '/get-pending/' + userId);
  }


}

