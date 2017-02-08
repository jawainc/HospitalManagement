import {Component, OnInit, ViewChild, ElementRef}                    from '@angular/core';
import {FormGroup, FormBuilder, Validators} from "@angular/forms";
import { NotEmptyValidator, CreateUniqueNameValidator }                   from '../../../shared/CustomValidators';
import { BaseService } from '../../../shared/BaseService'
import { Department } from '../../../models/department';
import {Doctor} from "../../../models/doctor";
import {Toasts} from "../../../common_components/toast.component";

@Component({
  templateUrl: '../templates/admin.departments.add.html',
  providers: [BaseService]
})
export class AdminDepartmentsAddComponent implements OnInit{


  @ViewChild(Toasts) toast: Toasts;



  dform: FormGroup;


  submitErrorText = '';
  submitError = false;
  submitted = false;

  dialogLoader = true;

  model = new Department();

  selectedDoctors: Doctor[] = [];

  _resetDoctors = false;


 unique_pending: false;

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

  constructor(private fb: FormBuilder, private service: BaseService) { }

  get resetDoctors(){
     return this._resetDoctors;
  }

  set resetDoctors(val: boolean){
    this._resetDoctors = val;
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

      let selectedDoctors = [];

      for(let doc of this.selectedDoctors)
        selectedDoctors.push({
            id: doc.id,
            percentage: doc.percentage
          });

      this.model.doctors = selectedDoctors;


      this.service.url = '/admin/departments/add';
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

  doctorsSelected(data: Doctor[]){
    this.selectedDoctors = data;

  }

  resetForm(){
    this.dform.reset();
    this.model = new Department;
    this.selectedDoctors = [];
    this.submitted = false;
    this.resetDoctors = true;
  }

  buildForm(): void {
    this.dform = this.fb.group({
      'name': [
        this.model.name, Validators.compose([
            NotEmptyValidator(),
            Validators.minLength(3),

          ]),
          CreateUniqueNameValidator(
            {
              url: "/admin/departments/check/unique/insert",
              column: 'name'
            },
            this
          )


      ],
    });


    this.dform.valueChanges
      .subscribe(data => {

       this.onValueChanged(data)
      });

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
             this.formErrors [field] = messages[key];
            }
          }
        }
      }
    }
  }

}
