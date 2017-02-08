import {Component, OnInit, ViewChild, AfterViewInit}                    from '@angular/core';
import { BaseService } from '../../../shared/BaseService'
import { Employee } from '../../../models/employee';
import { Router, ActivatedRoute, Params } from '@angular/router';

declare var moment: any;

@Component({
  templateUrl: '../templates/admin.employees.list.html',
  providers: [BaseService]
})
export class AdminEmployeesListComponent implements OnInit, AfterViewInit{


  @ViewChild('grid') grid: any;

  detailsOpenIndex = -1;

  toast_danger: any = document.getElementById('toast_danger');



  data: Employee[] = [];
  displayedData: Employee[] = [];




  constructor(
    private service: BaseService,
    private router: Router,
  ) { }



  ngOnInit(): void {
    this.getEmployees();
  }

  ngAfterViewInit() {

    this.grid.nativeElement.then(() => {
      this.gridReady(this.grid.nativeElement);
    });
  }

  getEmployees() {
    this.service.url = '/admin/employees/all';
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
        this.router.navigate(['/admin/employees/detail', item.id]);
      });
      this.detailsOpenIndex = selected[0];
    }
  }

  filter(event: any) {
    console.log("A");
    const filterText: string = (<HTMLInputElement>event.target).value.toLowerCase();
    this.displayedData = this.data.filter((employee: Employee) =>
      !filterText || employee.name.toLowerCase().indexOf(filterText) > -1
    );
  }

  gridReady(grid: any){
    grid.columns[5].renderer = (cell: any) => {
      cell.element.innerHTML = moment(cell.data).format('DD/MM/YYYY');
    };
  }





}
