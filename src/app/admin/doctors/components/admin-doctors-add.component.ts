import {Component, OnInit, ViewChild}                    from '@angular/core';
import {FormGroup, FormBuilder, Validators} from "@angular/forms";
import { NotEmptyValidator }                   from '../../../shared/CustomValidators';
import { BaseService } from '../../../shared/BaseService'
import { Doctor } from '../../../models/doctor';
import {Employee} from "../../../models/employee";
import {Toasts} from "../../../common_components/toast.component";


@Component({
  templateUrl: '../templates/admin.doctors.add.html',
  providers: [BaseService]
})
export class AdminDoctorsAddComponent implements OnInit{

  @ViewChild(Toasts) toast: Toasts;

  dform: FormGroup;

  submitErrorText = '';
  submitError = false;
  submitted = false;

  model = new Doctor();

  selectedEmployees: Employee[];
  _resetEmployees = false;


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

  constructor(private fb: FormBuilder, private service: BaseService) { }

  get resetEmployees(){
    return this._resetEmployees;
  }

  set resetEmployees(val: boolean){
    this._resetEmployees = val;
  }

  ngOnInit(): void {
    this.buildForm();


  }



  onSubmit(event: Event) {
    if (this.dform.valid) {

      this.submitted = true;
      this.submitError = false;
      this.submitErrorText = '';
      this.model = this.dform.value;
      this.model.gender = this.selectedGender;

      let selectedEmployees = [];

      for(let emp of this.selectedEmployees)
        selectedEmployees.push({
          id: emp.id,
          percentage: emp.percentage
        });

      this.model.employees = selectedEmployees;

      this.service.url = '/admin/doctors/add';
      this.service.method = 'post';
      this.service.access_server(this.model)
        .subscribe(
          data => {
            if(data.status == "OK"){
              this.submitted = false;
              this.toast.open("success", data.msg);
              this.resetForm();
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

  resetForm(){
    this.dform.reset();
    this.model = new Doctor;
    this.submitted = false;
    this.resetEmployees = true;
  }

  employeesSelected(data: Employee[]){
    this.selectedEmployees = data;

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
      'fee': [this.model.fee]
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

}
