import {Component, OnInit, ViewChild}                    from '@angular/core';
import {FormGroup, FormBuilder, Validators} from "@angular/forms";
import { NotEmptyValidator }                   from '../../../shared/CustomValidators';
import { BaseService } from '../../../shared/BaseService'
import { Employee } from '../../../models/Employee';
import {ActivatedRoute, Router} from "@angular/router";
import {Toasts} from "../../../common_components/toast.component";


@Component({
  templateUrl: '../templates/admin.employees.detail.html',
  providers: [BaseService]
})
export class AdminEmployeesDetailComponent implements OnInit{



  @ViewChild(Toasts) toast: Toasts;


  dform: FormGroup;

  id = '';

  submitErrorText = '';
  submitError = false;
  submitted = false;

  model = new Employee();

  valuesLoaded = false;

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

  constructor(
    private fb: FormBuilder,
    private service: BaseService,
    private route: ActivatedRoute,
    private router: Router,
  ) { }



  ngOnInit(): void {
    this.buildForm();
    this.getEmployee();


  }

  getEmployee() {

    this.id = this.route.snapshot.params['id'];



    this.service.url = `/admin/employees/get/${this.id}`;
    this.service.method = 'get';
    this.service.access_server()
      .subscribe(
        (data) => {
          this.model = data.data;
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
      this.model.join_date = this.selectedDate;
      this.model.gender = this.selectedGender;
      console.log(this.model);



      this.service.url = '/admin/employees/update';
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
    this.service.url = `/admin/employees/delete/${this.id}`;
    this.service.method = 'delete';
    this.service.access_server(this.model)
      .subscribe(
        data => {
          if(data.status == "OK"){
            this.submitted = false;
            this.toast.open('info', "Deleted Successfully");
            this.router.navigate(['/admin/employees/list']);
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
