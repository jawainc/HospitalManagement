import { NgModule }           from '@angular/core';
import { CommonModule }       from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { LoginComponent } from './login.component';

import { LoginRoutingModule }   from './login.route';


@NgModule({
  imports:      [ CommonModule, ReactiveFormsModule, LoginRoutingModule ],
  declarations: [ LoginComponent ],
  exports:      [ LoginComponent ],
  providers:    [  ]
})
export class LoginModule { }
