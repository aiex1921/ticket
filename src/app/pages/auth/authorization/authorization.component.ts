import { Component, OnInit } from '@angular/core';
import {IUser} from "../../../models/users";
import {AuthService} from "../../../services/auth/auth.service";
import {MessageService} from "primeng/api";
import {Router} from "@angular/router";
import {UserService} from "../../../services/user/user.service";
import {ConfigService} from "../../../services/config/config.service";
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {ServerError} from "../../../models/error";



@Component({
  selector: 'app-authorization',
  templateUrl: './authorization.component.html',
  styleUrls: ['./authorization.component.scss']
})
export class AuthorizationComponent implements OnInit {
  login: string;
  psw: string;
  loginText: string = " Логин ";
  pswText: string = "Пароль";
  selectedValue: boolean;
  cardNumber: string;
  authTextButton: string;
  showCardNumber: boolean;


  constructor(private authService: AuthService,
              private messageService: MessageService,
              private router: Router,
              private userService: UserService,
              private http: HttpClient) {
  }

  ngOnInit(): void {
    this.authTextButton = "Авторизоваться";
    this.showCardNumber = ConfigService.config.useUserCard;
  }

  ngOnDestroy(): void {
  }

  vipStatusSelected(): void {
  }

  onAuth(ev: Event): void {
    const authUser: IUser = {
      psw: this.psw,
      login: this.login,
      cardNumber: this.cardNumber
    }

    this.http.post<{ access_token:string, id: string }>('http://localhost:3000/users/' + authUser.login, authUser).subscribe((data) => {
      authUser.id = data.id;
      this.userService.setUser(authUser);
      const token: string = data.access_token;
      this.userService.setToken(token);

      this.router.navigate(['ticket/tickets-list']);
      this.messageService.add({severity: 'success', summary: 'Регистрация прошла успешно'});
    }, (err: HttpErrorResponse) => {
      const serverError = <ServerError>err.error;
      this.messageService.add({severity: 'warn', summary: serverError.errorText});

    });
  }
}
