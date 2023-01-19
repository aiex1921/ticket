import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SettingsRoutingModule } from './settings-routing.module';
import {SettingsComponent} from "./settings.component";
import {StatisticComponent} from "./statistic/statistic.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {InputTextModule} from "primeng/inputtext";
import {TabViewModule} from "primeng/tabview";
import {TableModule} from "primeng/table";
import { TourLoaderComponent } from './tour-loader/tour-loader.component';


@NgModule({
  declarations: [
    SettingsComponent,
    StatisticComponent,
    TourLoaderComponent
  ],
  imports: [
    CommonModule,
    SettingsRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    InputTextModule,
    TabViewModule,
    TableModule
  ]
})
export class SettingsModule { }
