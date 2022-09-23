import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { IMessage } from 'src/app/models/message';
import { IUser } from 'src/app/models/user';
import { IUserLogin } from 'src/app/models/user-login';
import { IUserLoginResponse } from 'src/app/models/user-login-response';
import { UserService } from 'src/app/services/http/user.service';
import { DialogSevice } from 'src/app/services/loading/dialog';
import { LoadingPanel } from 'src/app/services/loading/loading-panel';

@Component({
  selector: 'app-login-view',
  templateUrl: './login-view.component.html',
  styleUrls: ['./login-view.component.scss']
})
export class LoginViewComponent implements OnInit {
  title : any;

  username = new FormControl('',[
    Validators.required,
  ]);
  password = new FormControl('',[
    Validators.required,
  ]);
  loginForm = new FormGroup({
    username: this.username,
    password: this.password,
  },);
  private userService : UserService;
  private loadingPanel : LoadingPanel;
  private dialogService : DialogSevice;
  constructor(http: HttpClient,dialog : MatDialog, private router: Router) { 
    this.userService = new UserService(http);
    this.loadingPanel = new LoadingPanel(dialog);
    this.dialogService = new DialogSevice(dialog);
  }
  ngOnInit(): void {
    this.title = "Matuyd Restaurant";
  }

  onSubmit() {
    this.loadingPanel.show();
    this.userService.login(<IUserLogin> this.loginForm.value).subscribe((user : IUserLoginResponse| IMessage | any)=>{
      this.loadingPanel.hide();
      if(user?.data){
        this.dialogService.show(user?.message);
        localStorage.setItem('userInfo', JSON.stringify(user?.data));
        if(user?.data.is_admin){
          this.router.navigate(['/admin']);
        } else {
          this.router.navigate(['/customer']);
        }
      } else {
        this.dialogService.show(user);
      }
    });
  }
  
}