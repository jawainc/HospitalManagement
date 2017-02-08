import {Injectable} from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import 'rxjs/Rx';
import {Observable} from 'rxjs/Rx';
import {Config} from './config';

@Injectable()
export class BaseService {

  private config = new Config();

  private _base_url: string = this.config.api_server;
  private _url: string = "";
  private _method: string = "get";

  constructor( private http: Http ) {};

  get url(){
    return this._url;
  }
  set url(url_to_add: string){
    this._url = this._base_url+url_to_add;
  }

  get method(){
    return this._method;
  }
  set method(met: string){
    this._method = met;
  }

  access_server(data?: any) {
    const body = JSON.stringify(data);
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');

    switch (this.method) {
      case "post":
        return this.http.post(this.url, body, {
          headers: headers
        })
          .map(this.extractData)
          .catch(this.handleError);

      case "put":
        return this.http.put(this.url, body, {
          headers: headers
        })
          .map(this.extractData)
          .catch(this.handleError);

      case "delete":
        return this.http.delete(this.url,  {
          headers: headers
        })
          .map(this.extractData)
          .catch(this.handleError);

      default:
        return this.http.get(this.url,  {
          headers: headers
        })
          .map(this.extractData)
          .catch(this.handleError);

    }


  }



  private handleError(error: any) {
    return Observable.throw(error);
  }

  private extractData(res: Response) {
    let body = res.json();
    return body.data || { };
  }

}
