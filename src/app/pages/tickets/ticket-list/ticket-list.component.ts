import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {TicketService} from "../../../services/tickets/ticket.service";
import {ITour} from "../../../models/tours";
import {TicketsStorageService} from "../../../services/tickets-storage/tickets-storage.service";
import {ActivatedRoute, Router} from "@angular/router";
import {BlocksStyleDirective} from "../../../directive/blocks-style.directive";

@Component({
  selector: 'app-ticket-list',
  templateUrl: './ticket-list.component.html',
  styleUrls: ['./ticket-list.component.scss']
})
export class TicketListComponent implements OnInit {
  tickets: ITour[];
  loadCountBlock:boolean = false;
  startNumber:number = 0;


  @ViewChild('tourWrap', {read: BlocksStyleDirective}) blockDirective: BlocksStyleDirective;

  @ViewChild('tourWrap') tourWrap: ElementRef;

  constructor(private ticketService:TicketService,
              private router: Router,
              private ticketStorage:TicketsStorageService) { }

  ngOnInit(): void {
    this.ticketService.getTickets().subscribe(
      (data)=>{
        this.tickets = data;
        this.ticketStorage.setStorage(data);
      }
    )
  }

  ngAfterViewInit(){}

  goToTicketInfoPage(item:ITour){
    this.router.navigate([`/ticket/ticket/${item.id}`]);
  }

  directiveRenderComplete(ev:boolean){
    const el: HTMLElement = this.tourWrap.nativeElement;
    el.setAttribute('style', 'background-color: --bs-gray-200')
    this.blockDirective.initStyle(this.startNumber);
    this.loadCountBlock = true;
  }

}
