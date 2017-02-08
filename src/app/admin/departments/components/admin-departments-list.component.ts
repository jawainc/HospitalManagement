import {Component, OnInit}                    from '@angular/core';
import { BaseService } from '../../../shared/BaseService'
import { Department } from '../../../models/department';
import { Router } from '@angular/router';

declare var moment: any;

@Component({
  templateUrl: '../templates/admin.departments.list.html',
  providers: [BaseService]
})
export class AdminDepartmentsListComponent implements OnInit{




  url = 'departments';
  detailsOpenIndex = -1;

  toast_danger: any = document.getElementById('toast_danger');



  data: Department[] = [];
  displayedData: Department[] = [];




  constructor(
    private service: BaseService,
    private router: Router,
  ) { }



  ngOnInit(): void {
    this.getData();
  }

  getData() {
    this.service.url = `/admin/${this.url}/all`;
    this.service.method = 'get';
    return this.service.access_server()
      .subscribe(
        (data) => {
          this.displayedData = this.data = data.data
        });
  }

  showDetail(event: any){
    const grid = event.target;
    grid.setRowDetailsVisible(this.detailsOpenIndex, false);
    var selected = grid.selection.selected();
    if (selected.length == 1) {
      grid.getItem(selected[0], (error, item) => {
        if(!error)
        this.router.navigate([`/admin/${this.url}/detail`, item.id]);
      });
      this.detailsOpenIndex = selected[0];
    }
  }

  filter(event: any) {
    const filterText: string = (<HTMLInputElement>event.target).value.toLowerCase();
    this.displayedData = this.data.filter((dep: Department) =>
      !filterText || dep.name.toLowerCase().indexOf(filterText) > -1
    );
  }
}
