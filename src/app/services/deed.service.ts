import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Deed} from '../models/deed';
const HEROKU_URL = `https://calm-waters-93672.herokuapp.com/deeds`;
@Injectable({
  providedIn: 'root'
})
export class DeedService {

  deedToExpand: string;

  constructor(private http: HttpClient) {
    console.log(this.deedToExpand);
  }

  getDeeds(): Observable<Deed[]> {

    return this.http.get<Deed[]>(HEROKU_URL);
  }

  createAuthorizationHeader(headers: HttpHeaders) {
    headers.append('Content-Type', 'application/json');
  }


  addDeed(deed: Deed) {
    return this.http.post(HEROKU_URL, deed);
  }
  // TODO: add service method to set and fetch the deed to expand
  setDeedToExpand(title: string) {
    this.deedToExpand = title;
  }
  getDeedToExpand() {
    return this.deedToExpand;
  }

}
