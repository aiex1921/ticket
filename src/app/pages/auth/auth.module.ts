import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './auth.component';
import { RegistrationComponent } from './registration/registration.component';
import { AuthorizationComponent } from './authorization/authorization.component';
import {AppRoutingModule} from "./auth-routing.module";
import {TabViewModule} from 'primeng/tabview';
import {InputTextModule} from 'primeng/inputtext';
import {FormsModule} from "@angular/forms";
import {CheckboxModule} from 'primeng/checkbox';
import {ToastModule} from 'primeng/toast';




@NgModule({
  declarations: [
    LoginComponent,
    RegistrationComponent,
    AuthorizationComponent
  ],
  imports: [
    CommonModule,
    AppRoutingModule,
    TabViewModule,
    InputTextModule,
    FormsModule,
    CheckboxModule,
    ToastModule
  ]
})
export class AuthModule { }
