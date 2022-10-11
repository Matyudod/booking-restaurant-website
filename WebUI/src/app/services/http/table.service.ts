import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { ConfigService } from "src/app/configs/config.service";
import { IMessage } from 'src/app/models/message';
@Injectable()
export class TableService {
  constructor(private http: HttpClient) { }
  url = new ConfigService().url + '/api/table';

  getTableInfo(table_id: Number): Observable<IMessage | any> {
    return this.http.get<IMessage>(this.url + '/detail/' + table_id);
  }
}

