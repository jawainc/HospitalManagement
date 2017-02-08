import {NgModule}            from '@angular/core';
import {RouterModule}        from '@angular/router';

import {AdminComponent}    from './admin.component';
import {AdminDashboardComponent} from "./components/admin.dashboard";

@NgModule({
  imports: [RouterModule.forChild([
    {
      path: '',
      component: AdminComponent,
      children: [

            {path: 'departments', loadChildren: 'app/admin/departments/admin-departments.module#AdminDepartmentsModule'},
            {path: 'doctors', loadChildren: 'app/admin/doctors/admin-doctors.module#AdminDoctorsModule'},
            {path: 'employees', loadChildren: 'app/admin/employees/admin-employees.module#AdminEmployeesModule'},
            {path: '', component: AdminDashboardComponent}

      ]
    }
  ])],
  exports: [RouterModule]
})
export class AdminRoutingModule {
}
