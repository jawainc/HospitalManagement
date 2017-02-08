/**
 * Created by jawad on 10/21/2016.
 */
import {async, ComponentFixture, TestBed, ComponentFixtureAutoDetect, inject} from '@angular/core/testing';
import { By }              from '@angular/platform-browser';
import { DebugElement }    from '@angular/core';

import { LoginComponent } from '../../login/login.component';
import {ReactiveFormsModule, FormGroup} from '@angular/forms';
import {LoginService} from '../../services/login-service';
import {HttpModule, XHRBackend, Http, ResponseOptions, Response} from '@angular/http';
import {MockBackend, MockConnection} from '@angular/http/testing';

let comp:    LoginComponent;
let fixture: ComponentFixture<LoginComponent>;
let de:      DebugElement;
let el:      HTMLElement;

describe('LoginComponent', () => {
  beforeEach(() => {

    TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [HttpModule, ReactiveFormsModule],
      providers: [
        { provide: ComponentFixtureAutoDetect, useValue: true },
        LoginService,
        { provide: XHRBackend, useClass: MockBackend }
      ]
    });

    fixture = TestBed.createComponent(LoginComponent);
    comp = fixture.componentInstance;

    de = fixture.debugElement.query(By.css('h1'));
    el = de.nativeElement;
  });

  it('should have a defined component', () => {
    expect(comp).toBeDefined();
  });

  it('should create a `FormGroup` comprised of `FormControl`s', () => {
    comp.ngOnInit();
    expect(comp.loginForm instanceof FormGroup).toBe(true);
  });

  it('should display title', () => {
    expect(el.textContent).toContain(comp.title, 'original title');
    comp.title = 'Test Title';
    fixture.detectChanges();
    expect(el.textContent).toContain('Test Title', 'test title');
    comp.title = '';
    expect(el.textContent).toContain('', 'empty title');
  });

  it('should create a `FormControl` for each field', () => {
    expect(Object.keys(comp.loginForm.controls)).toEqual([
      'login_id', 'password'
    ]);
  });

  it('Validate login_id, password, form invalidity', () => {
    let login_id = comp.loginForm.controls['login_id'];
    let password = comp.loginForm.controls['password'];
    login_id.setValue('');
    password.setValue('');
    fixture.detectChanges();
    expect(login_id.invalid).toBe(true, 'login_id invalid');
    expect(password.invalid).toBe(true, 'password invalid');

    login_id.setValue(' ');
    password.setValue(' ');
    fixture.detectChanges();
    expect(login_id.invalid).toBe(true, 'login_id with space invalid');
    expect(password.invalid).toBe(true, 'password with space invalid');

    // testing form submit
    comp.onSubmit();
    expect(comp.loginForm.invalid).toBe(true, 'form invalid');
    expect(comp.submitError).toBe(true, 'submit error');
    expect(comp.submitErrorText).toEqual('Please fill all fields.', 'error text');
  });


  describe('check form submit', () => {
    let backend: MockBackend;
    let service: LoginService;

    beforeEach(inject([Http, XHRBackend], (http: Http, be: MockBackend) => {
      backend = be;
      service = new LoginService(http);
      de = fixture.debugElement.query(By.css('#formSubmitError'));
      el = de.nativeElement;
    }));

    it('should submit form and response 200', async(inject([], () => {
      let resp = new Response(new ResponseOptions({status: 200, body: {msg: 'Login id or password incorrect.'}}));
      backend.connections.subscribe((c: MockConnection) => c.mockRespond(resp));

      let login_id = comp.loginForm.controls['login_id'];
      let password = comp.loginForm.controls['password'];
      login_id.setValue('abc');
      password.setValue('abc');

      fixture.detectChanges();
      expect(login_id.valid).toBeTruthy('login_id valid');
      expect(password.valid).toBeTruthy('password valid');

      // testing form submit after valid

      comp.onSubmit();
      expect(comp.loginForm.valid).toBe(true, 'form valid');
      service.auth({login_id: comp.model.login_id, password: comp.model.password})
        .do(data => {
          comp.submitErrorText = data.msg;
          fixture.detectChanges();
          expect(el.textContent).toContain(data.msg, 'server response 200');
        })
        .toPromise();


    })));
  });

});
