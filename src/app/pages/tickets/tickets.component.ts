import { Component, OnInit } from '@angular/core';
import {TicketService} from "../../services/tickets/ticket.service";
import {ITour} from "../../models/tours";
import {IMenuType} from "../../models/menuType";

@Component({
  selector: 'app-tickets',
  templateUrl: './tickets.component.html',
  styleUrls: ['./tickets.component.scss']
})
export class TicketsComponent implements OnInit {
  tickets: ITour[] = [];
  selectedType: IMenuType;

  constructor(private ticketService:TicketService) { }

  ngOnInit(): void {
    this.ticketService.getTickets().subscribe((data) => {
      this.tickets = data;
    })

  }

  updateSelectedType(ev: IMenuType): void {
    this.selectedType = ev;
  }
}
