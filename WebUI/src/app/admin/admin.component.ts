import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IUser } from '../models/user';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  userInfo: any = null;
  title: any = null;

  constructor(private router: Router) {
    this.userInfo = JSON.parse(<string>localStorage.getItem('userInfo')) as IUser;
    this.title = <string>localStorage.getItem('title') as String;
    localStorage.clear();
    if (this.userInfo == null) {
      this.router.navigate(['/login']);
    }
  }

  ngOnInit(): void {
  }

}