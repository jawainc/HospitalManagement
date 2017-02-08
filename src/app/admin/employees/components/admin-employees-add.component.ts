import {Component, OnInit, ViewChild}                    from '@angular/core';
import {FormGroup, FormBuilder, Validators} from "@angular/forms";
import { NotEmptyValidator }                   from '../../../shared/CustomValidators';
import { BaseService } from '../../../shared/BaseService'
import { Employee } from '../../../models/Employee';
import {Toasts} from "../../../common_components/toast.component";


@Component({
  templateUrl: '../templates/admin.employees.add.html',
  providers: [BaseService]
})
export class AdminEmployeesAddComponent implements OnInit{



  @ViewChild(Toasts) toast: Toasts;


  dform: FormGroup;

  submitErrorText = '';
  submitError = false;
  submitted = false;

  model = new Employee();




  selectedDate:string = '';
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



  ngOnInit(): void {
    this.buildForm();


  }



  onSubmit(event: Event) {
    if (this.dform.valid) {

      this.submitted = true;
      this.submitError = false;
      this.submitErrorText = '';
      this.model = this.dform.value;
      this.model.join_date = this.selectedDate;
      this.model.gender = this.selectedGender;

      this.service.url = '/admin/employees/add';
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
    this.model = new Employee;
    this.submitted = false;
  }

  buildForm(): void {
    this.dform = this.fb.group({
      'name': [this.model.name, [
        NotEmptyValidator
      ]],
      'email': [this.model.email],
      'phone': [this.model.phone],
      'gender': [this.model.gender],
      'address': [this.model.address],
      'designation': [this.model.designation],
      'salary': [this.model.salary],
      'percentage': [this.model.percentage],
      'image': [this.model.image],
      'age': [this.model.age],
      'join_date': [this.model.join_date],
      'notes': [this.model.notes]
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
