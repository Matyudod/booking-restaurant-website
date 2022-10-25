import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { ConfigService } from 'src/app/configs/config.service';
import { IMessage } from 'src/app/models/message';
import { IMainIngredient } from 'src/app/models/main-ingredient';
import { IMainIngredientCreate } from 'src/app/models/main-ingredient-create';
@Injectable()
export class MainIngredientService {
  constructor(private http: HttpClient) {}
  url = new ConfigService().url + '/api/main-ingredient';

  createMainIngredient(mainIngredient: IMainIngredientCreate) {
    return this.http.post<IMainIngredient | IMessage>(
      this.url + '/create',
      mainIngredient
    );
  }

  getAll() {
    return this.http.get<IMainIngredient[] | IMessage>(this.url + '/get-all');
  }

  getList(pagination: any): Observable<any | IMessage> {
    let params = new HttpParams();
    if (pagination.page != null)
      params = params.append('page', pagination.page);
    if (pagination.size != null)
      params = params.append('size', pagination.size);
    if (pagination.field != null)
      params = params.append('field', pagination.field);
    if (pagination.is_reverse_sort != null)
      params = params.append('is_reverse_sort', pagination.is_reverse_sort);
    return this.http.get<any | IMessage>(this.url + '/pagination', {
      params: params,
    });
  }
  updateMainIngredient(id: Number, MainIngredient: IMainIngredientCreate) {
    return this.http.post<IMainIngredient | IMessage>(
      this.url + '/update/' + id,
      MainIngredient
    );
  }

  deteleMainIngredient(main_ingredient_id: Number): Observable<IMessage | any> {
    return this.http.delete<IMessage>(
      this.url + '/delete/' + main_ingredient_id
    );
  }
}
