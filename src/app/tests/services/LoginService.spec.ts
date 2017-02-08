import {
  async, inject, TestBed
} from '@angular/core/testing';

import {
  MockBackend,
  MockConnection
} from '@angular/http/testing';

import {
  HttpModule, Http, XHRBackend, Response, ResponseOptions
} from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';

import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/toPromise';

import { Login } from '../../login/login';
import { LoginService } from '../../services/login-service';
import {fail} from 'assert';

const makeData = () => [
  { login_id: 'bob', password: 'bob' }
] as Login[];
////////  Tests  /////////////
describe('Login-Service (mockBackend)', () => {

  beforeEach( async(() => {
    TestBed.configureTestingModule({
      imports: [ HttpModule ],
      providers: [
        LoginService,
        { provide: XHRBackend, useClass: MockBackend }
      ]
    })
      .compileComponents();
  }));

  it('can instantiate service when inject service',
    inject([LoginService], (service: LoginService) => {
      expect(service instanceof LoginService).toBe(true);
    }));



  it('can instantiate service with "new"', inject([Http], (http: Http) => {
    expect(http).not.toBeNull('http should be provided');
    let service = new LoginService(http);
    expect(service instanceof LoginService).toBe(true, 'new service should be ok');
  }));


  it('can provide the mockBackend as XHRBackend',
    inject([XHRBackend], (backend: MockBackend) => {
      expect(backend).not.toBeNull('backend should be provided');
    }));

  describe('when check auth', () => {
    let backend: MockBackend;
    let service: LoginService;
    let fakeLogins: Login[];

    beforeEach(inject([Http, XHRBackend], (http: Http, be: MockBackend) => {
      backend = be;
      service = new LoginService(http);
      fakeLogins = makeData();

    }));

    it('should treat 200 as an Observable', async(inject([], () => {
      let resp = new Response(new ResponseOptions({status: 200, body: {msg: 'Login id or password incorrect.'}}));
      backend.connections.subscribe((c: MockConnection) => c.mockRespond(resp));

      service.auth(fakeLogins)
        .do(data => {
          expect(data.msg).toEqual('Login id or password incorrect.', 'server response 200');
        })
        .toPromise();
    })));

    it('should treat 401 as an Observable error', async(inject([], () => {
      let resp = new Response(new ResponseOptions({status: 401, body: {error: 'Unauthorized'}}));
      backend.connections.subscribe((c: MockConnection) => c.mockRespond(resp));

      service.auth(fakeLogins)
        .do(data => {
          fail(401, 401, data.error, data);
        })
        .catch(err => {
          expect(err.message).toMatch('Unauthorized', 'should catch bad response status code 401');
          return Observable.of(null);
        })
        .toPromise();
    })));

    it('should treat 404 as an Observable error', async(inject([], () => {
      let resp = new Response(new ResponseOptions({status: 404, body: {error: 'Not Found'}}));
      backend.connections.subscribe((c: MockConnection) => c.mockRespond(resp));

      service.auth(fakeLogins)
        .do(data => {
          fail(404, 404, data.error, data);
        })
        .catch(err => {
          expect(err.message).toMatch('Not Found', 'should catch bad response status code');
          return Observable.of(null);
        })
        .toPromise();
    })));
  });
});

