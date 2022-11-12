import {APP_INITIALIZER, NgModule} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {AuthService} from "./services/auth/auth.service";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {RestInterceptorsService} from "./services/interceptors/rest-interceptors.service";
import {ConfigService} from "./services/config/config.service";
import {TabViewModule} from "primeng/tabview";
import {InputTextModule} from "primeng/inputtext";
import {FormsModule} from "@angular/forms";
import {TableModule} from "primeng/table";

function initializeApp(config: ConfigService){
  return() => config.loadPromise().then(() =>{
    console.log('---CONFIG LOADED--', ConfigService.config)
  })
}



@NgModule({
  declarations: [
    AppComponent,


  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        HttpClientModule,
        TabViewModule,
        InputTextModule,
        FormsModule,
        TableModule
    ],
  providers: [
    AuthService,
    ConfigService,
    {
      provide:APP_INITIALIZER,
      useFactory: initializeApp,
      deps: [ConfigService], multi: true
    },
    {provide: HTTP_INTERCEPTORS, useClass: RestInterceptorsService, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
