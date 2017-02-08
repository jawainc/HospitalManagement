import {NgModule}            from '@angular/core';
import {RouterModule}        from '@angular/router';
import {AdminEmployeesComponent} from "./admin-employees.component";
import {AdminEmployeesListComponent} from "./components/admin-employees-list.component";
import {AdminEmployeesAddComponent} from "./components/admin-employees-add.component";
import {AdminEmployeesDetailComponent} from "./components/admin-employeees-detail.component";



@NgModule({
  imports: [RouterModule.forChild([
    {
      path: '',
      component: AdminEmployeesComponent,
      children: [
        {
          path: '',
          children: [
            {path: 'list', component: AdminEmployeesListComponent},
            {path: '', component: AdminEmployeesListComponent},
            {path: 'add', component: AdminEmployeesAddComponent},
            {path: 'detail/:id', component: AdminEmployeesDetailComponent},
          ]
        }
      ]
    }
  ])],
  exports: [RouterModule]
})
export class AdminEmployeesRoutingModule {
}
