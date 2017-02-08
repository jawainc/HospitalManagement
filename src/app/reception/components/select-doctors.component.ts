import {Component, Input, ViewChild, ElementRef, Output, EventEmitter} from '@angular/core';
import {Doctor} from "../../models/doctor";
import {BaseService} from "../../shared/BaseService";

@Component({
  selector: 'doctor-selecter',
  templateUrl: '../templates/select.doctors.html'
})

export class SelectDoctorComponent  {

  @Output() private onDoctorsSelected = new EventEmitter();

  @ViewChild('docGrid') private docGrid: ElementRef;
  @ViewChild('addSelectedDialog') private addSelectedDialog: ElementRef;

  private dialogLoader = true;
  private doctorData = [];
  private displayedDoctorData = [];


  private doctors_data = [];


  @Input()
  private set reset(val: boolean){

    if(val){
      this.doReset();
    }

  }

  constructor(private service: BaseService) { }



  public addDoctorsOpen(){
    var dialog: any = this.addSelectedDialog.nativeElement;
    if(dialog){
      dialog.open();
      this.service.url = `/reception/outdoor/doctors`;
      this.service.method = 'get';
      return this.service.access_server()
        .subscribe(
          (data) => {

            for(let dep of data.data){

              for(let doc of dep.doctors){


                this.doctors_data.push({
                  name: doc.name+" ("+dep.name+")",
                  fee: doc.fee,
                  department_id: dep.id,
                  doctor_id: doc.id

                })

              }

            }

            this.displayedDoctorData = this.doctorData = this.doctors_data;
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


    selected.forEach((obj) => {

      grid.getItem(obj, (error, item) => {
        if(!error){
          this.onDoctorsSelected.emit(item);
        }

      })

    });



      dialog.close();
  }



  private doReset(){
    this.doctorData = [];
    this.displayedDoctorData = [];

  }

}
