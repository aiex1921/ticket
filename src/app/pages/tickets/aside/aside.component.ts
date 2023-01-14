import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {IMenuType} from "../../../models/menuType";
import {ITour, ITourTypeSelect} from "../../../models/tours";
import {TicketService} from "../../../services/tickets/ticket.service";
import {MessageService} from "primeng/api";
import {SettingsService} from "../../../services/settings/settings.service";
import {error} from "@angular/compiler-cli/src/transformers/util";
import {HttpClient} from "@angular/common/http";



@Component({
  selector: 'app-aside',
  templateUrl: './aside.component.html',
  styleUrls: ['./aside.component.scss']
})
export class AsideComponent implements OnInit {
  menuTypes: IMenuType[];
  tourTypes: ITourTypeSelect[] = [
    {label: 'Все', value: 'all'},
    {label: 'Одиночный', value: 'single'},
    {label: 'Групповой', value: 'multi'}
  ];
  obj = {type: 'custom', label: 'Обычное'};
  selectedMenuType: IMenuType;
  tourDefaultDate = new Date();


  @Output() updateMenuType: EventEmitter<IMenuType> = new EventEmitter();



  constructor(private ticketService:TicketService,
              //private messageService: MessageService,
              private settingsService: SettingsService,
              private http: HttpClient
              ) { }

  ngOnInit(): void {
    this.menuTypes = [
      {type: 'custom', label : 'Обычное'},
      {type: 'extended', label : 'Расширенное'}
    ]
  }

  ngAfterViewInit(){
    this.ticketService.updateTour({date: this.tourDefaultDate.toString()})
  }

  changeType(ev: {ev: Event, value: IMenuType}): void {
    console.log('ev', ev)
    this.updateMenuType.emit(ev.value);
  }

  changeTourType(ev:  {ev: Event, value: ITourTypeSelect}): void {
    this.ticketService.updateTour(ev.value)
  }

  selectDate(ev: string) {
    console.log('ev', ev)
    this.ticketService.updateTour({date:ev})
  }

  initRestError(): void {
    this.ticketService.getError().subscribe({
      next: (data) => {},
      error: (err) => {
      console.log ('err', err)
    },
  complete: () => {}
    //this.messageService.add({severity:'error', summary:'Проверьте введённые данные'
    });
  }

  initSettingsData():void{
    this.settingsService.loadUserSettingsSubject({
      saveToken: false
    })
  }

  initTours(): void{
    this.http.post<ITour[]>("http://localhost:3000/tours/",{}).subscribe((data) => {
    this.ticketService.updateTicketList(data)
    });
  }

  deleteTours(): void{
    this.http.delete("http://localhost:3000/tours").subscribe((data) => {
      this.ticketService.updateTicketList([]);
    });
  }

}
