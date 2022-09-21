import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login-view',
  templateUrl: './login-view.component.html',
  styleUrls: ['./login-view.component.scss']
})
export class LoginViewComponent implements OnInit {
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

  constructor() { }

  ngOnInit(): void {
  }
  onSubmit() {
    console.warn(this.loginForm.value);
  }
  
}