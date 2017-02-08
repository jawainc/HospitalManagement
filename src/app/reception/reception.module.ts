import {NgModule, CUSTOM_ELEMENTS_SCHEMA}           from '@angular/core';
import { CommonModule }       from '@angular/common';


import { ReceptionComponent } from './reception.component';

import { ReceptionRoutingModule }   from './reception.route';

import {ReactiveFormsModule} from "@angular/forms";

import {OutDoorComponent} from "./outdoor/outdoor.component";
import {ToastModule} from "../common_components/ToastModule";
import {BaseService} from "../shared/BaseService";
import {SelectDoctorComponent} from "./components/select-doctors.component";


@NgModule({
  imports:      [
    ToastModule,
    CommonModule,
    ReceptionRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [
    ReceptionComponent,
    OutDoorComponent,
    SelectDoctorComponent
  ],
  exports:      [
    ReceptionComponent
  ],
  providers:    [ BaseService ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ReceptionModule { }
