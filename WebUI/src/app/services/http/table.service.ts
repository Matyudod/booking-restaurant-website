import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { ConfigService } from "src/app/configs/config.service";
import { IMessage } from 'src/app/models/message';
import { ITable } from 'src/app/models/table';
import { ITableList } from 'src/app/models/table-list';
@Injectable()
export class TableService {
  constructor(private http: HttpClient) { }
  url = new ConfigService().url + '/api/table';

  getTableInfo(table_id: Number): Observable<ITable | IMessage | any> {
    return this.http.get<ITable | IMessage>(this.url + '/detail/' + table_id);
  }

  getList(): Observable<ITableList | IMessage | any> {
    let params = new HttpParams();
    params = params.append("page", 1);
    params = params.append("size", 100);
    return this.http.get<ITableList | IMessage>(this.url + '/pagination', { params: params });
  }
}

