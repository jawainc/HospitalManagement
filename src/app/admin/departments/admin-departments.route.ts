import {NgModule}            from '@angular/core';
import {RouterModule}        from '@angular/router';
import {AdminDepartmentsComponent} from "./admin-departments.component";
import {AdminDepartmentsListComponent} from "./components/admin-departments-list.component";
import {AdminDepartmentsAddComponent} from "./components/admin-departments-add.component";
import {AdminDepartmentsDetailComponent} from "./components/admin-departments-detail.component";



@NgModule({
  imports: [RouterModule.forChild([
    {
      path: '',
      component: AdminDepartmentsComponent,
      children: [
        {
          path: '',
          children: [
            {path: 'list', component: AdminDepartmentsListComponent},
            {path: '', component: AdminDepartmentsListComponent},
            {path: 'add', component: AdminDepartmentsAddComponent},
            {path: 'detail/:id', component: AdminDepartmentsDetailComponent},
          ]
        }
      ]
    }
  ])],
  exports: [RouterModule]
})
export class AdminDepartmentsRoutingModule {
}
