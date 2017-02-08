import { NgModule, CUSTOM_ELEMENTS_SCHEMA }           from '@angular/core';
import { CommonModule }       from '@angular/common';

import {ReactiveFormsModule, FormsModule} from "@angular/forms";

import { AdminDepartmentsComponent } from './admin-departments.component';

import { AdminDepartmentsRoutingModule }   from './admin-departments.route';

import {AdminDepartmentsListComponent} from './components/admin-departments-list.component';
import {AdminDepartmentsAddComponent} from "./components/admin-departments-add.component";
import {AdminDepartmentsDetailComponent} from "./components/admin-departments-detail.component";
import {SelectDoctorComponent} from "./components/select-doctors.component";

import {ToastModule} from "../../common_components/ToastModule";


@NgModule({
  imports:      [
    CommonModule,
    AdminDepartmentsRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    ToastModule
  ],
  declarations: [
    SelectDoctorComponent,
    AdminDepartmentsComponent,
    AdminDepartmentsListComponent,
    AdminDepartmentsAddComponent,
    AdminDepartmentsDetailComponent
  ],
  exports:      [
    AdminDepartmentsComponent
  ],
  providers:    [  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AdminDepartmentsModule { }
