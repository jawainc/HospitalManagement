import {Component, Input, ViewChild, ElementRef, Output, EventEmitter} from '@angular/core';
import {Employee} from "../../../models/employee";
import {BaseService} from "../../../shared/BaseService";

@Component({
  selector: 'employees-selecter',
  templateUrl: '../templates/select.employees.html'
})

export class SelectEmployeeComponent  {

  @Output() onSelected = new EventEmitter<Employee[]>();

  @ViewChild('Grid') Grid: ElementRef;
  @ViewChild('addSelectedDialog') addSelectedDialog: ElementRef;

  dialogLoader = true;

  selected: Employee[] = [];
  Data: Employee[] = [];
  displayedData: Employee[] = [];
  checkedData: Employee[] = [];



  @Input()
  set reset(val: boolean){

    if(val){
      this.doReset();
    }

  }

  constructor(private service: BaseService) { }




  private get isChecked(){
    return this.checkedData.length > 0 ? true : false;
  }

  addData(data: Employee[]){
    this.selected = data;
  }

  private addOpen(){
    var dialog: any = this.addSelectedDialog.nativeElement;
    if(dialog){
      dialog.open();
      this.service.url = `/admin/employees/all`;
      this.service.method = 'get';
      return this.service.access_server()
        .subscribe(
          (data) => {
            this.displayedData = this.Data = data.data;
            this.dialogLoader = false;
          });
    }

  }

  private filterDialogList(event: any){
    const filterText: string = (<HTMLInputElement>event.target).value.toLowerCase();
    this.displayedData = this.Data.filter((doc: Employee) =>
      !filterText || doc.name.toLowerCase().indexOf(filterText) > -1
    );
  }

  private dataSelected(){
    const dialog: any = this.addSelectedDialog.nativeElement;
    const grid = this.Grid.nativeElement;
    let selected = grid.selection.selected();
    let tempData = [];

    selected.forEach((obj) => {

      grid.getItem(obj, (error, item) => {
        if(!error){
          tempData.push(item);
        }

      })

    });

    if(tempData.length > 0)
      this.selected = tempData;

    this.onSelected.emit(this.selected);

    dialog.close();

  }


  private checkBoxChanged(doc: Employee, event: any){

    if((<HTMLInputElement>event.target).checked){
      this.checkedData.push(doc);
    }
    else{
      var index = this.checkedData.indexOf(doc);
      if (index === -1) {
        return;
      }
      this.checkedData.splice(index, 1);
    }

  }



  private removeSelected(){
    if(this.checkedData.length > 0){
      for(let doc of this.checkedData){
        var index = this.selected.indexOf(doc);
        if (index !== -1) {
          this.selected.splice(index, 1);
        }

      }
      this.checkedData = [];
    }

    this.onSelected.emit(this.selected);

  }

  private onPercentageChange(event: any){
    var elem = event.target;
    if(elem.value < 0)
      elem.value = 0
    else if(elem.value > 100)
      elem.value = 100


  }

  private doReset(){
    this.selected = [];
    this.Data = [];
    this.displayedData = [];
    this.checkedData = [];
  }

}
