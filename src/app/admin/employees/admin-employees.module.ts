import { NgModule, CUSTOM_ELEMENTS_SCHEMA }           from '@angular/core';
import { CommonModule }       from '@angular/common';
import {ReactiveFormsModule, FormsModule} from "@angular/forms";
import { AdminEmployeesComponent } from './admin-employees.component';
import { AdminEmployeesRoutingModule }   from './admin-employees.route';
import {AdminEmployeesListComponent} from './components/admin-employees-list.component';
import {AdminEmployeesAddComponent} from "./components/admin-employees-add.component";
import {AdminEmployeesDetailComponent} from "./components/admin-employeees-detail.component";
import {ToastModule} from "../../common_components/ToastModule";


@NgModule({
  imports:      [
    CommonModule,
    AdminEmployeesRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    ToastModule
  ],
  declarations: [
    AdminEmployeesComponent,
    AdminEmployeesListComponent,
    AdminEmployeesAddComponent,
    AdminEmployeesDetailComponent
  ],
  exports:      [
    AdminEmployeesComponent
  ],
  providers:    [  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AdminEmployeesModule { }
