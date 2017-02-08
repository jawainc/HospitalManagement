import {NgModule}            from '@angular/core';
import {RouterModule}        from '@angular/router';
import {AdminDoctorsComponent} from "./admin-doctors.component";
import {AdminDoctorsListComponent} from "./components/admin-doctors-list.component";
import {AdminDoctorsAddComponent} from "./components/admin-doctors-add.component";
import {AdminDoctorsDetailComponent} from "./components/admin-doctors-detail.component";



@NgModule({
  imports: [RouterModule.forChild([
    {
      path: '',
      component: AdminDoctorsComponent,
      children: [
        {
          path: '',
          children: [
            {path: 'list', component: AdminDoctorsListComponent},
            {path: '', component: AdminDoctorsListComponent},
            {path: 'add', component: AdminDoctorsAddComponent},
            {path: 'detail/:id', component: AdminDoctorsDetailComponent},
          ]
        }
      ]
    }
  ])],
  exports: [RouterModule]
})
export class AdminDoctorsRoutingModule {
}
