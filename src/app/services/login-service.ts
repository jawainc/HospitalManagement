import {Injectable} from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import 'rxjs/Rx';
import {Observable} from 'rxjs/Rx';
import {Config} from '../shared/config';

@Injectable()
export class LoginService {

  config = new Config();
  private auth_url = this.config.api_server;

  constructor( private http: Http ) { };

  auth(user: any) {
    const body = JSON.stringify(user);
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post(this.auth_url, body, {
      headers: headers
    })
      .map((data: Response) => data.json())
      .catch(this.handleError);
  }

  private handleError(error: any) {
    return Observable.throw(error.json());
  }

}
