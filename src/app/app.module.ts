import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HttpModule, JsonpModule } from '@angular/http';
import { PolymerElement } from '@vaadin/angular2-polymer';


/**
 * Main Conponent
 */
import { AppComponent } from './app.component';

/* Login Imports */
import { LoginModule }      from './login/login.module';

/**
 * Routing Module
 */
import {AppRoutingModule} from './app-routing.module';



@NgModule({
  declarations: [
    AppComponent,

    PolymerElement('vaadin-combo-box'),
    PolymerElement('vaadin-grid'),
    PolymerElement('vaadin-date-picker'),
    PolymerElement('paper-input'),
    PolymerElement('paper-textarea'),
    PolymerElement('paper-button'),
    PolymerElement('paper-icon-button'),
    PolymerElement('paper-dialog'),
    PolymerElement('paper-toast'),
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpModule,
    JsonpModule,
    LoginModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
