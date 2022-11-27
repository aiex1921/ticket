import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subject, Subscription, take, takeUntil} from "rxjs";
import {ObservableExampleService} from "../../services/testing/observable-example.service";
import {SettingsService} from "../../services/settings/settings.service";
import {UserService} from "../../services/user/user.service";
import {IUser} from "../../models/users";
import {MessageService} from "primeng/api";


@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit, OnDestroy {

  currentPsw:string;
  newPsw:string;
  newPswRepeat:string;

  private subjectForUnsubscribe = new Subject();

  constructor(private testing: ObservableExampleService,
              private settingsService: SettingsService,
              private messageService: MessageService,
              private userService: UserService
              ) { }

  ngOnInit(): void {

    //settingsData observable
    this.settingsService.loadUserSettings().pipe(takeUntil(this.subjectForUnsubscribe)).subscribe((data) =>{
      console.log('settings data', data)
    });

    //settingsData subject
    this.settingsService.getSettingsSubjectObservable().pipe(takeUntil(this.subjectForUnsubscribe)).subscribe((data) =>{
      console.log('settings data from subject', data)
    })

  }

  ngOnDestroy(){
    this.subjectForUnsubscribe.next(true);
    this.subjectForUnsubscribe.complete();
  }

  changePsw():void{

    const user = <IUser>this.userService.getUser();

    if (user.psw === this.currentPsw){
      if (this.newPsw === this.newPswRepeat){
        user.psw = this.newPsw;
        const userString = JSON.stringify(user)
        window.localStorage.setItem('user_'+user.login, userString);
        this.messageService.add({severity:'success', summary:'Смена пароля прошла успешно.'});
      } else {
        this.messageService.add({severity:'warn', summary:'Повторите операции по вводу и подтверждению нового пароля.'});
      }
    } else {
      this.messageService.add({severity:'error', summary:'Действующий пароль введён неверно. Повторите ввод.'});
       }

  }

}
