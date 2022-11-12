import { Component } from '@angular/core';
import {ObservableExampleService} from "./services/testing/observable-example.service";
import {ConfigService} from "./services/config/config.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'ticketSalesAngular';
  prop:string;
  constructor(private testing: ObservableExampleService,
              private config: ConfigService) {

  }

  ngOnInit(){

    this.config.configLoad();

    //**Observable*/
    //first subscriber
    const myObservable = this.testing.getObservable();
    myObservable.subscribe((data) =>{
      //console.log('first myObservable data', data)
    });

    //second subscriber

    myObservable.subscribe((data) =>{
      //console.log('second myObservable data', data)
    });

    //**Subject*/

    const mySubject = this.testing.getSubject();

      //mySubject.subscribe((data)=>{
      //console.log('first mySubject data', data)
      //});

      //mySubject.subscribe((data)=>{
      //console.log('second mySubject data', data)
      //});

    //send subjectData
    mySubject.next('subject value');
    //send subjectData
    mySubject.next('subject value');

    //**Behavior Subject*/
    const myBehavior = this.testing.getBehaviorSubject();
    myBehavior.subscribe((data)=>{
      //console.log('first behaviorSubject data', data)
    });

    //myBehavior.next('new data from behaviorSubject');
    //myBehavior.next('new data1 from behaviorSubject');
  }


}
