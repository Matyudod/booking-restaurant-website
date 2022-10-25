import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { ConfigService } from 'src/app/configs/config.service';
import { IMessage } from 'src/app/models/message';
import { IMainIngredientDetail } from 'src/app/models/main-ingredient-detail';
import { IMainIngredientDetailCreate } from '../../models/main-ingredient-detail-create';
@Injectable()
export class MainIngredientDetailService {
  constructor(private http: HttpClient) {}
  url = new ConfigService().url + '/api/main-ingredient-detail';

  getList(food_id: number | Number) {
    return this.http.get<IMainIngredientDetail[] | IMessage>(
      this.url + '/get-list/' + food_id
    );
  }
  addMainIngredientDetail(mainIngredientDetail: IMainIngredientDetailCreate) {
    return this.http.post<IMessage>(this.url + '/create', mainIngredientDetail);
  }

  updateMainingredientdetails(
    id: Number,
    Mainingredientdetails: IMainIngredientDetailCreate
  ) {
    return this.http.post<IMainIngredientDetail | IMessage>(
      this.url + '/update/' + id,
      Mainingredientdetails
    );
  }

  deteleMainingredientdetails(
    main_ingredient_detail_id: Number
  ): Observable<IMessage | any> {
    return this.http.delete<IMessage>(
      this.url + '/delete/' + main_ingredient_detail_id
    );
  }
}
