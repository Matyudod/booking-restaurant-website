import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IUser } from '../models/user';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.scss']
})
export class CustomerComponent implements OnInit {

  userInfo: any = null;
  title: any = "";

  constructor(private router: Router) {
    this.userInfo = JSON.parse(<string>localStorage.getItem('userInfo')) as IUser;
    this.title = <string>localStorage.getItem('title') as String;
    localStorage.clear()
    localStorage.setItem("SessionID", this.userInfo.refreshToken);
    if (this.userInfo == null) {
      this.router.navigate(['/login']);
    }
  }

  ngOnInit(): void {
  }
}
