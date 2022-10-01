import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {
  login:string|undefined;
  psw:string|undefined;
  pswRepeat:string|undefined;
  email:string|undefined;
  cardNumber:string|undefined;


  constructor() { }

  ngOnInit(): void {
  }

  registration(ev: Event):void{
    if (this.psw !== this.pswRepeat){

    }

  }

}
