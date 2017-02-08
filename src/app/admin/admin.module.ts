import { NgModule, CUSTOM_ELEMENTS_SCHEMA }           from '@angular/core';
import { CommonModule }       from '@angular/common';
import { AdminComponent } from './admin.component';
import { AdminRoutingModule }   from './admin.route';
import {AdminDashboardComponent} from "./components/admin.dashboard";
import {ReactiveFormsModule, FormsModule} from "@angular/forms";
import { AddDirective } from "../shared/AddDirective";

@NgModule({
  imports:      [
    CommonModule,
    AdminRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ],
  declarations: [

    AdminComponent,
    AdminDashboardComponent,
    AddDirective
  ],
  exports:      [
    AdminComponent
  ],
  providers:    [  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AdminModule { }
