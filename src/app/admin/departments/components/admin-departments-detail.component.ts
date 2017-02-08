import {Component, OnInit, ViewChild} from '@angular/core';
import {FormGroup, FormBuilder, Validators} from "@angular/forms";
import {
  NotEmptyValidator, CreateUniqueNameValidator,
  UpdateUniqueNameValidator
} from '../../../shared/CustomValidators';
import { BaseService } from '../../../shared/BaseService'
import { Department } from '../../../models/department';
import {ActivatedRoute, Router} from "@angular/router";
import {Doctor} from "../../../models/doctor";
import {Toasts} from "../../../common_components/toast.component";
import {SelectDoctorComponent} from "./select-doctors.component";


@Component({
  templateUrl: '../templates/admin.departments.detail.html',
  providers: [BaseService]
})
export class AdminDepartmentsDetailComponent implements OnInit{


  @ViewChild(Toasts) toast: Toasts;
  @ViewChild(SelectDoctorComponent) doctorSelected: SelectDoctorComponent

  dform: FormGroup;

  id = '';
  url = 'departments';

  submitErrorText = '';
  submitError = false;
  submitted = false;

  model = new Department();


  selectedDoctors: Doctor[] = [];

  doctorData: Doctor[] = [];
  displayedDoctorData: Doctor[] = [];

  unique_pending: false;

  dialogLoader = false;
  _resetDoctors = false;

  formErrors = {
    'name' : ''
  };

  validationMessages = {
    'name': {
      'required': 'Name is required.',
      'minlength': 'Name must be at least 3 characters long.',
      'unique': 'Name Already Exists',
    }
  };

  constructor(
    private fb: FormBuilder,
    private service: BaseService,
    private route: ActivatedRoute,
    private router: Router,
  ) { }



  ngOnInit(): void {

    this.getDepartment();
    this.buildForm();

  }

  getDepartment() {

    this.id = this.route.snapshot.params['id'];



    this.service.url = `/admin/${this.url}/get/embeded/${this.id}`;
    this.service.method = 'get';
    this.service.access_server()
      .subscribe(
        (data) => {
          this.model = data.data;

          this.selectedDoctors = this.model.doctors;
          this.doctorSelected.addDoctorData(this.model.doctors);
        },
        (error) => {
          this.toast.open('danger', error);

        }
      );






  }


  onSubmit(event: Event) {
    if (this.dform.valid) {

      this.submitted = true;
      this.submitError = false;
      this.submitErrorText = '';
      this.model = this.dform.value;
      this.model.id = this.id;


      let selectedDoctors = [];

      for(let doc of this.selectedDoctors)
        selectedDoctors.push({
          id: doc.id,
          percentage: doc.percentage
        });

      this.model.doctors = selectedDoctors;

      this.service.url = `/admin/${this.url}/update`;
      this.service.method = 'put';
      this.service.access_server(this.model)
        .subscribe(
          data => {
            if(data.status == "OK"){
              this.submitted = false;
              this.toast.open('success', data.msg);
            }
            else {
              this.submitted = false;
              this.toast.open('error', data.msg);
            }
          },
          error => {
            this.submitted = false;
            this.toast.open('danger', error);
          }
        )

    } else {
      this.submitted = false;
      this.toast.open('danger', "Please Fill Required fields");

    }


  }

  confirmDelete(){
    var dialog: any = document.getElementById('delDialog');
    if(dialog)
      dialog.open();
  }
  deleteConfirm(){
    this.service.url = `/admin/${this.url}/delete/${this.id}`;
    this.service.method = 'delete';
    this.service.access_server(this.model)
      .subscribe(
        data => {
          if(data.status == "OK"){
            this.submitted = false;
            this.toast.open('info', "Deleted Successfully");
            this.router.navigate([`/admin/${this.url}/list`]);
          }
          else {
            this.submitted = false;
            this.toast.open('error', data.msg);
          }
        },
        error => {
          this.submitted = false;
          this.toast.open('danger', error);
        }
      )
  }

  buildForm(): void {
    this.dform = this.fb.group({
      'name': [this.model.name, Validators.compose([
        NotEmptyValidator(),
        Validators.minLength(3),
      ]),
        UpdateUniqueNameValidator({
            url: `/admin/${this.url}/check/unique/update`,
            column: 'name',
            id: this.id
          },
          this)
      ]
    });

    this.dform.valueChanges
      .subscribe(data => this.onValueChanged(data));

    this.onValueChanged();

  }

  onValueChanged(data?: any) {
    if (!this.dform) {
      return;
    }

    const form = this.dform;


    for ( const field in this.formErrors ) {
      // clear previous error message (if any)
      if (field) {
        this.formErrors[field] = '';
        const control = form.get(field);

        if (control && control.dirty && !control.valid) {
          const messages = this.validationMessages [field];
          for (const key in control.errors) {
            if (key) {
              this.formErrors [field] += messages[key] + ' ';
            }
          }
        }
      }
    }
  }


  /**
   *
   * Doctors Settings
   */

  get resetDoctors(){
    return this._resetDoctors;
  }

  set resetDoctors(val: boolean){
    this._resetDoctors = val;
  }
  doctorsSelected(data: Doctor[]){
    this.selectedDoctors = data;

  }


}
