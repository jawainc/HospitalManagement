import { Component, OnInit }                    from '@angular/core';
import { FormGroup, FormBuilder, Validators }   from '@angular/forms';

import { Login }                                from './login';
import { NotEmptyValidator }                   from '../shared/CustomValidators';
 import { LoginService }                         from '../services/login-service';

@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [ LoginService ]
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  title = 'Amin Hospital';
  submitErrorText = '';
  submitError = false;

  model = new Login('', '');
  submitted = false;

  formErrors = {
    'login_id' : '',
    'password' : ''
  };

  validationMessages = {
    'login_id': {
      'required': 'Login id is required.'
    },
    'password': {
      'required': 'Password is required.'
    }
  };

  constructor(private fb: FormBuilder, private loginService: LoginService) { }

  ngOnInit(): void {
    this.buildForm();
  }

  onSubmit() {
    if (this.loginForm.valid) {
      this.submitted = true;
      this.submitError = false;
      this.submitErrorText = '';
      this.model = this.loginForm.value;

      this.loginService.auth(this.model)
        .subscribe(
          data => {
            this.submitted = false;
            this.submitError = true;
            this.submitErrorText = data.msg;
          },
          error => {
            this.submitted = false;
            this.submitError = true;
            this.submitErrorText = error.error;
          }
        );
    } else {
      this.submitError = true;
      this.submitErrorText = 'Please fill all fields.';
    }
  }

  buildForm(): void {
    this.loginForm = this.fb.group({
      'login_id': [this.model.login_id, [
        Validators.required,
        NotEmptyValidator()
      ]],
      'password': [this.model.password, [
        Validators.required,
        NotEmptyValidator()
      ]]
    });

    this.loginForm.valueChanges
      .subscribe(data => this.onValueChanged(data));

    this.onValueChanged();

  }

  onValueChanged(data?: any) {
    if (!this.loginForm) {
      return;
    }

    const form = this.loginForm;


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
