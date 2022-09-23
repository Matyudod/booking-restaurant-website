import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoadingPanelComponent } from './components/loading-panel/loading-panel.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './modules/material/material.module';
import { LoginViewComponent } from './views/login-view/login-view.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { DialogComponent } from './components/dialog/dialog.component';
import { SignUpViewComponent } from './views/sign-up-view/sign-up-view.component';

@NgModule({
  declarations: [
    AppComponent,
    LoadingPanelComponent,
    LoginViewComponent,
    DialogComponent,
    SignUpViewComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
