import {Component, OnInit, ViewChild}                    from '@angular/core';
import { BaseService } from '../../../shared/BaseService'
import { Doctor } from '../../../models/doctor';
import { Router } from '@angular/router';

declare var moment: any;

@Component({
  templateUrl: '../templates/admin.doctors.list.html',
  providers: [BaseService]
})
export class AdminDoctorsListComponent implements OnInit{


  @ViewChild('grid') grid: any;

  detailsOpenIndex = -1;

  toast_danger: any = document.getElementById('toast_danger');



  data: Doctor[] = [];
  displayedData: Doctor[] = [];




  constructor(
    private service: BaseService,
    private router: Router,
  ) { }



  ngOnInit(): void {
    this.getData();
  }

  getData() {
    this.service.url = '/admin/doctors/all';
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
        this.router.navigate(['/admin/doctors/detail', item.id]);
      });
      this.detailsOpenIndex = selected[0];
    }
  }

  filter(event: any) {
    console.log("A");
    const filterText: string = (<HTMLInputElement>event.target).value.toLowerCase();
    this.displayedData = this.data.filter((doctor: Doctor) =>
      !filterText || doctor.name.toLowerCase().indexOf(filterText) > -1
    );
  }
}
