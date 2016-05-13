
import {Injectable} from '@angular/core';
import {Region} from './Region';
import {  Http, Response } from '@angular/http';
import {Observable} from 'rxjs/Observable';
//import 'rxjs/add/operator/map';

@Injectable()
export class HTTPEveService {
  private uri = 'https://crest-tq.eveonline.com/regions/';
  private Regions = Object;
  result: Object;
  constructor(private http: Http) { }
  
  /*
  getRegions(): Observable<Region[]> {
    return <Observable<Region[]>>this.http.get(this.uri)
      .map(this.extractData)
      .catch(this.handleError);
  }*/
  getRegions(): Object {
     this.result = {friends:[]};
     //this.http.get(this.uri).map((res: Response) => res.json()).subscribe(res => this.result = res);
     this.http.get(this.uri).map(res => res.json()).subscribe(r => this.Regions = r);
    return this.Regions;
    //return this.http.get(this.uri)
     // .map(this.extractData)
     // .catch(this.handleError);
  }
  private extractData(res: Response) {
    if (res.status < 200 || res.status >= 300) {
      throw new Error('Bad response status: ' + res.status);
    }
    let body = res.json();
    return body.data || {};
  }
private handleError (error: any) {
  // In a real world app, we might send the error to remote logging infrastructure
  let errMsg = error.message || 'Server error';
  console.error(errMsg); // log to console instead
  return errMsg;
}

  
}