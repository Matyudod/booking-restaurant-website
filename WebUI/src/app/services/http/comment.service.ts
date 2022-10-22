import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { ConfigService } from "src/app/configs/config.service";
import { IMessage } from 'src/app/models/message';
import { IComment } from 'src/app/models/comment';
@Injectable()
export class CommentService {
  constructor(private http: HttpClient) { }
  url = new ConfigService().url + '/api/comment';

  getCommentWithBillId(bill_id: Number): Observable<IComment | IMessage | any> {
    return this.http.get<IComment | IMessage>(this.url + '/get/' + bill_id);
  }
  createNewComment(comment: any): Observable<IMessage | any> {
    return this.http.post<IMessage>(this.url + '/create/', comment);
  }
}

