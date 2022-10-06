import { Component, OnInit } from '@angular/core';
import {IUser} from "../../../models/users";
import {AuthService} from "../../../services/auth/auth.service";
import {MessageService} from "primeng/api";
import {Route, Router} from "@angular/router";


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
      this.router.navigate(['tickets']);
      console.log(this.router);

    } else {
     this.messageService.add({severity:'error', summary:'Проверьте введённые данные'});
    }
  }
}
