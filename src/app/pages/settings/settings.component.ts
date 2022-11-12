import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subject, Subscription, take, takeUntil} from "rxjs";
import {ObservableExampleService} from "../../services/testing/observable-example.service";
import {SettingsService} from "../../services/settings/settings.service";
import {UserService} from "../../services/user/user.service";
import {IUser} from "../../models/users";


@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit, OnDestroy {
  private subjectForUnsubscribe = new Subject();

   currentPsw:string;
   newPsw:string;
   oldPsw:string;
   user: IUser;


  constructor(private testing: ObservableExampleService,
              private settingsService: SettingsService,

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

    this.user = this.userService.getUser();



    if (this.oldPsw !== this.user.psw){
      console.log('Пароль введён неверно. Повторите попытку.')
      console.log(this.user);
    } else {
      if (this.newPsw === this.currentPsw){
        this.user.psw = this.newPsw;
        this.userService.setUser(this.user);
        console.log('Пароль успешно изменён.');
        console.log(this.user);

      } else {
        console.log('Пароль не изменён.');
      }
    }
  }

}
