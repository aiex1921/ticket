import { Component, OnInit } from '@angular/core';
import {IUser} from "../../../models/users";
import {AuthService} from "../../../services/auth/auth.service";

@Component({
  selector: 'app-authorization',
  templateUrl: './authorization.component.html',
  styleUrls: ['./authorization.component.scss']
})
export class AuthorizationComponent implements OnInit {
  login: string | undefined ;
  psw: string | undefined ;
  loginText: string = "Логин";
  pswText: string = 'Пароль';
  selectedValue: boolean = false;
  cardNumber: string | undefined ;
  authTextButton: string | undefined;

  constructor(private authService:AuthService) { }

  ngOnInit(): void {
    this.authTextButton = "Авторизоваться";
  }

  ngOnDestroy():void{

  }

  vipStatusSelected():void{}

  onAuth(ev: Event):void{
    const authUser:IUser = {
      psw: this.psw,
      login: this.login
    }
    if (this.authService.checkUser(authUser)){
      console.log('auth true')
    } else {
     console.log('auth false')
    }
  }
}
