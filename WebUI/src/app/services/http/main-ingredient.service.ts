import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { ConfigService } from "src/app/configs/config.service";
import { IMessage } from 'src/app/models/message';
import { IMainIngredient } from 'src/app/models/main-ingredient';
@Injectable()
export class MainIngredientService {
  constructor(private http: HttpClient) { }
  url = new ConfigService().url + '/api/main-ingredient';

  getAll() {
    return this.http.get<IMainIngredient[] | IMessage>(this.url + '/get-all');
  }


}

