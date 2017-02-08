import {Injectable} from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import 'rxjs/Rx';
import {Observable} from 'rxjs/Rx';
import {Config} from '../../shared/config';

@Injectable()
export class DepartmentService {

  config = new Config();
  private add_url = this.config.api_server+'/admin/department/add';

  constructor( private http: Http ) { };

  add(department: any) {
    const body = JSON.stringify(department);
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');


    return this.http.post(this.add_url, body, {
      headers: headers
    })
      .map(this.extractData)
      .catch(this.handleError);
  }

  private handleError(error: any) {
    return Observable.throw(error);
  }

  private extractData(res: Response) {
    let body = res.json();
    return body.data || { };
  }

}
