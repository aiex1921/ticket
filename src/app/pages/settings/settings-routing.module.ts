import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {SettingsComponent} from "./settings.component";
import {StatisticComponent} from "./statistic/statistic.component";
import {TicketsComponent} from "../tickets/tickets.component";
import {TicketListComponent} from "../tickets/ticket-list/ticket-list.component";





const routes: Routes = [
  { path: '',
    component: SettingsComponent,

  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SettingsRoutingModule { }
