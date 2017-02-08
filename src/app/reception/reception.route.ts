import {NgModule}            from '@angular/core';
import {RouterModule}        from '@angular/router';
import {ReceptionComponent} from "./reception.component";

import {OutDoorComponent} from "./outdoor/outdoor.component";

@NgModule({
  imports: [RouterModule.forChild([
    {
      path: '',
      component: ReceptionComponent,

          children: [
            {path: 'outdoor', component: OutDoorComponent},
            {path: '', component: OutDoorComponent}
          ]

    }
  ])],
  exports: [RouterModule]
})
export class ReceptionRoutingModule {
}
