import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Deed} from '../models/deed';

@Injectable({
  providedIn: 'root'
})
export class DeedService {

  constructor(private http: HttpClient) {
  }

  getDeeds(): Observable<Deed[]> {
    return this.http.get<Deed[]>(`https://calm-waters-93672.herokuapp.com/deeds`);
  }

  createAuthorizationHeader(headers: HttpHeaders) {
    headers.append('Content-Type', 'application/json');
  }


  addDeed(deed: Deed) {
    return this.http.post('https://calm-waters-93672.herokuapp.com/deed', deed);
  }

}
