import { NgModule, CUSTOM_ELEMENTS_SCHEMA }           from '@angular/core';
import { CommonModule }       from '@angular/common';
import {ReactiveFormsModule, FormsModule} from "@angular/forms";
import {ToastModule} from "../../common_components/ToastModule";
import {OutDoorComponent} from "./outdoor.component";


@NgModule({
  imports:      [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    ToastModule
  ],
  declarations: [
    OutDoorComponent
  ],
  exports:      [
    OutDoorComponent
  ],
  providers:    [  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class OutDoorModule { }
