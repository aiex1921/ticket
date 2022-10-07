import { Component, OnInit } from '@angular/core';
import {IUser} from "../../../models/users";
import {AuthService} from "../../../services/auth/auth.service";
import {MessageService} from "primeng/api";
import {provideRouter, Router} from "@angular/router";



@Component({
  selector: 'app-authorization',
  templateUrl: './authorization.component.html',
  styleUrls: ['./authorization.component.scss']
})
export class AuthorizationComponent implements OnInit {
  login: string;
  psw: string;
  loginText: string = "Логин";
  pswText: string = 'Пароль';
  selectedValue: boolean;
  cardNumber: string;
  authTextButton: string;


  constructor(private authService:AuthService,
              private messageService: MessageService,
              private router: Router) { }

  ngOnInit(): void {
    this.authTextButton = "Авторизоваться";
  }

  ngOnDestroy():void{}

  vipStatusSelected():void{}

  onAuth(ev:Event):void{
    const authUser: IUser = {
      psw: this.psw,
      login: this.login
    }
    if (this.authService.checkUser(authUser)){
      this.router.navigate(['tickets/tickets-list']);



    } else {
     this.messageService.add({severity:'error', summary:'Проверьте введённые данные'});
    }
  }
}
