import {Component, OnInit, ViewChild}                    from '@angular/core';
import {FormGroup, FormBuilder, Validators} from "@angular/forms";
import { NotEmptyValidator }                   from '../../../shared/CustomValidators';
import { BaseService } from '../../../shared/BaseService'
import { Doctor } from '../../../models/doctor';
import {ActivatedRoute, Router} from "@angular/router";
import {Employee} from "../../../models/employee";
import {Toasts} from "../../../common_components/toast.component";
import {SelectEmployeeComponent} from "./select-employees.component";


@Component({
  templateUrl: '../templates/admin.doctors.detail.html',
  providers: [BaseService]
})
export class AdminDoctorsDetailComponent implements OnInit{

  @ViewChild(Toasts) toast: Toasts;
  @ViewChild(SelectEmployeeComponent) employeeSelected: SelectEmployeeComponent

  dform: FormGroup;
  id = '';
  submitErrorText = '';
  submitError = false;
  submitted = false;
  selectedEmployees: Employee[];
  _resetEmployees = false;
  model = new Doctor();
  selectedGender:string = '';
  genders = [
    'Male',
    'Female'
  ];
  formErrors = {
    'name' : ''
  };
  validationMessages = {
    'name': {
      'required': 'Name is required.'
    }
  };

  constructor(
    private fb: FormBuilder,
    private service: BaseService,
    private route: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.buildForm();
    this.getDoctor();


  }

  getDoctor() {

    this.id = this.route.snapshot.params['id'];



    this.service.url = `/admin/doctors/get/embeded/${this.id}`;
    this.service.method = 'get';
    this.service.access_server()
      .subscribe(
        (data) => {
          this.model = data.data;
          this.selectedEmployees = this.model.employees;
          this.employeeSelected.addData(this.model.employees);
        },
        (error) => {
          this.toast.open("danger", error);
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
      this.model.gender = this.selectedGender;
      let selectedEmployees = [];

      for(let emp of this.selectedEmployees)
        selectedEmployees.push({
          id: emp.id,
          percentage: emp.percentage
        });

      this.model.employees = selectedEmployees;

      this.service.url = '/admin/doctors/update';
      this.service.method = 'put';
      this.service.access_server(this.model)
        .subscribe(
          data => {
            if(data.status == "OK"){
              this.submitted = false;
              this.toast.open("success", data.msg);
            }
            else {
              this.submitted = false;
              this.toast.open("error", data.msg);
            }
          },
          error => {
            this.submitted = false;
            this.toast.open("danger", error);
          }
        )

    } else {
      this.submitted = false;
      this.toast.open("danger", "Please Fill Required fields");
    }


  }

  confirmDelete(){
    var dialog: any = document.getElementById('delDialog');
    if(dialog)
      dialog.open();
  }
  deleteConfirm(){
    this.service.url = `/admin/doctors/delete/${this.id}`;
    this.service.method = 'delete';
    this.service.access_server(this.model)
      .subscribe(
        data => {
          if(data.status == "OK"){
            this.submitted = false;
            this.toast.open("info", data.msg);
            this.router.navigate(['/admin/doctors/list']);
          }
          else {
            this.submitted = false;
            this.toast.open("error", data.msg);
          }
        },
        error => {
          this.submitted = false;
          this.toast.open("danger", error);
        }
      )
  }

  buildForm(): void {
    this.dform = this.fb.group({
      'name': [this.model.name, [
        NotEmptyValidator()
      ]],
      'email': [this.model.email],
      'phone': [this.model.phone],
      'gender': [this.model.gender],
      'address': [this.model.address],
      'percentage': [this.model.percentage],
      'image': [this.model.image],
      'notes': [this.model.notes],
      'fee': [this.model.fee],
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

  get resetEmployees(){
    return this._resetEmployees;
  }

  set resetEmployees(val: boolean){
    this._resetEmployees = val;
  }

  employeesSelected(data: Employee[]){
    this.selectedEmployees = data;

  }
}
