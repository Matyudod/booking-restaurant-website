import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserLogin } from 'src/app/models/user-login';
import { User } from 'src/app/models/user';
@Injectable()
export class UserService {
  constructor(private http: HttpClient) { }
    url = new ConfigService().url+'/api/user';
  async login(user : UserLogin) : Promise<User>{
    return await this.http.get<User>(this.url+'/login');
  }
}

