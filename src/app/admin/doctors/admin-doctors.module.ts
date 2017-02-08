import { NgModule, CUSTOM_ELEMENTS_SCHEMA }           from '@angular/core';
import { CommonModule }       from '@angular/common';

import {ReactiveFormsModule, FormsModule} from "@angular/forms";

import { AdminDoctorsComponent } from './admin-doctors.component';

import { AdminDoctorsRoutingModule }   from './admin-doctors.route';

import {AdminDoctorsListComponent} from './components/admin-doctors-list.component';
import {AdminDoctorsAddComponent} from "./components/admin-doctors-add.component";
import {AdminDoctorsDetailComponent} from "./components/admin-doctors-detail.component";
import {SelectEmployeeComponent} from "./components/select-employees.component";
import {ToastModule} from "../../common_components/ToastModule";


@NgModule({
  imports:      [
    CommonModule,
    AdminDoctorsRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    ToastModule
  ],
  declarations: [
    SelectEmployeeComponent,
    AdminDoctorsComponent,
    AdminDoctorsListComponent,
    AdminDoctorsAddComponent,
    AdminDoctorsDetailComponent
  ],
  exports:      [
    AdminDoctorsComponent
  ],
  providers:    [  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AdminDoctorsModule { }
