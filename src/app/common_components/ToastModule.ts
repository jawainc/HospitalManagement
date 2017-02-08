import { NgModule, CUSTOM_ELEMENTS_SCHEMA }           from '@angular/core';
import { CommonModule }       from '@angular/common';

import {Toasts} from "./toast.component";

@NgModule({
  imports:      [
    CommonModule
  ],
  declarations: [

    Toasts,

  ],
  exports:      [
    Toasts
  ],
  providers:    [  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ToastModule { }
