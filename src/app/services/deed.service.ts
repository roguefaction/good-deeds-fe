import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Deed} from '../models/deed';

@Injectable({
  providedIn: 'root'
})
export class DeedService {

  private deedToExpand: string;
  private currentPage: number;
  private deedList: Deed[];

  constructor(private http: HttpClient) {
    this.currentPage = 1;
  }

  getUpcomingDeeds(): Observable<Deed[]> {
    return this.http.get<Deed[]>(`https://calm-waters-93672.herokuapp.com/allupcomingdeeds`);
  }

  getAllDeeds(): Observable<Deed[]> {
    return this.http.get<Deed[]>(`https://calm-waters-93672.herokuapp.com/deeds`);
  }

  getOrganizedDeeds(): Observable<Deed[]> {
    return this.http.get<Deed[]>(`https://calm-waters-93672.herokuapp.com/users/deeds`);
  }

  getParticipationDeeds(): Observable<Deed[]> {
    return this.http.get<Deed[]>(`https://calm-waters-93672.herokuapp.com/users/participation-deeds`);
  }

  getAttendingUsers(deedID: number): Observable<Deed[]> {
    return this.http.get<Deed[]>('https://calm-waters-93672.herokuapp.com/deed/' + deedID + '/participatingusers');
  }

  createAuthorizationHeader(headers: HttpHeaders) {
    headers.append('Content-Type', 'application/json');
  }

  addDeed(deed: Deed) {
    return this.http.post('https://calm-waters-93672.herokuapp.com/deed', deed);
  }
  setDeedToExpand(title: string) {
    this.deedToExpand = title;
  }
  getDeedToExpand() {
    return this.deedToExpand;
  }
  getPage() {
    return this.currentPage;
  }
  setPage(page: number) {
    this.currentPage = page;
  }

  setPageOfDeed(titleToSearch: string){
    this.getUpcomingDeeds().subscribe(
      deeds => {
        for (let deed of deeds) {
          if (deed.title === titleToSearch){
            let page = deeds.indexOf(deed) / 5 + 1;
            page = Math.trunc(page);
            this.setPage(page);
          }
        }
      }
    );
  }

  editDeed(deed: Deed, id: number) {
    return this.http.post('https://calm-waters-93672.herokuapp.com/deed/' + id + '/edit/', deed);
  }

  getDeedById(id: number): Observable<Deed> {
    return this.http.get<Deed>('https://calm-waters-93672.herokuapp.com/deed/' + id);

  }

  participateInADeed(id: number) {
    return this.http.post('https://calm-waters-93672.herokuapp.com/deed/' + id + '/participate', '');
  }

  cancelParticipation(id: number) {
    return this.http.post('https://calm-waters-93672.herokuapp.com/deed/' + id + '/participate/delete', '');
  }


  deleteDeed(id: number) {
    return this.http.post('https://calm-waters-93672.herokuapp.com/deed/' + id + '/delete/', '');
  }
}
