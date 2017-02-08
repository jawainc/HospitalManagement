import {Component, Input, ViewChild, ElementRef, Output, EventEmitter, OnInit, AfterViewInit} from '@angular/core';
import {Doctor} from "../../../models/doctor";
import {BaseService} from "../../../shared/BaseService";

@Component({
  selector: 'doctor-selecter',
  templateUrl: '../templates/select.doctors.html'
})

export class SelectDoctorComponent  {

  @Output() onDoctorsSelected = new EventEmitter<Doctor[]>();

  @ViewChild('docGrid') docGrid: ElementRef;
  @ViewChild('addSelectedDialog') addSelectedDialog: ElementRef;

  dialogLoader = true;

  selectedDoctors: Doctor[] = [];
  doctorData: Doctor[] = [];
  displayedDoctorData: Doctor[] = [];
  checkedDoctorsData: Doctor[] = [];



  @Input()
  set reset(val: boolean){

    if(val){
      this.doReset();
    }

  }

  constructor(private service: BaseService) { }




  private get isCheckedDoctors(){
    return this.checkedDoctorsData.length > 0 ? true : false;
  }

  addDoctorData(data: Doctor[]){
    this.selectedDoctors = data;
  }

  private addDoctorsOpen(){
    var dialog: any = this.addSelectedDialog.nativeElement;
    if(dialog){
      dialog.open();
      this.service.url = `/admin/doctors/all`;
      this.service.method = 'get';
      return this.service.access_server()
        .subscribe(
          (data) => {
            this.displayedDoctorData = this.doctorData = data.data;
            this.dialogLoader = false;
          });
    }

  }

  private filterDialogList(event: any){
    const filterText: string = (<HTMLInputElement>event.target).value.toLowerCase();
    this.displayedDoctorData = this.doctorData.filter((doc: Doctor) =>
      !filterText || doc.name.toLowerCase().indexOf(filterText) > -1
    );
  }

  private doctorSelected(){
    const dialog: any = this.addSelectedDialog.nativeElement;
    const grid = this.docGrid.nativeElement;
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
      this.selectedDoctors = tempData;

    this.onDoctorsSelected.emit(this.selectedDoctors);

    dialog.close();

  }


  private checkBoxChanged(doc: Doctor, event: any){

    if((<HTMLInputElement>event.target).checked){
      this.checkedDoctorsData.push(doc);
    }
    else{
      var index = this.checkedDoctorsData.indexOf(doc);
      if (index === -1) {
        return;
      }
      this.checkedDoctorsData.splice(index, 1);
    }

  }



  private removeSelected(){
    if(this.checkedDoctorsData.length > 0){
      for(let doc of this.checkedDoctorsData){
        var index = this.selectedDoctors.indexOf(doc);
        if (index !== -1) {
          this.selectedDoctors.splice(index, 1);
        }

      }
      this.checkedDoctorsData = [];
    }

    this.onDoctorsSelected.emit(this.selectedDoctors);

  }

  private onPercentageChange(event: any){
    var elem = event.target;
    if(elem.value < 0)
      elem.value = 0
    else if(elem.value > 100)
      elem.value = 100


  }

  private doReset(){
    this.selectedDoctors = [];
    this.doctorData = [];
    this.displayedDoctorData = [];
    this.checkedDoctorsData = [];
  }

}
