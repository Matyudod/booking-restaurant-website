import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IUserLogin } from 'src/app/models/user-login';
import { IUserLoginResponse } from 'src/app/models/user-login-response';
import { Observable, throwError } from 'rxjs';
import { ConfigService } from "src/app/configs/config.service";
import { IMessage } from 'src/app/models/message';
import { IUserSignUp } from 'src/app/models/user-signup';
@Injectable()
export class UserService {
  constructor(private http: HttpClient) { }
  url = new ConfigService().url + '/api/user';

  login(user: IUserLogin): Observable<IUserLoginResponse | IMessage> {
    return this.http.post<IUserLoginResponse | IMessage>(this.url + '/login', user)
  }

  signup(user: IUserSignUp): Observable<IUserLoginResponse | IMessage> {
    return this.http.post<IUserLoginResponse | IMessage>(this.url + '/signup', user)
  }
}

