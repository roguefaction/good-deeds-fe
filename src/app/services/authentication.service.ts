import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {User} from '../models/user';
import {Deed} from '../models/deed';


@Injectable({providedIn: 'root'})
export class AuthenticationService {
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;
  public currentUserObject: User;

  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  login(email: string, password: string) {
    return this.http.post<any>('https://calm-waters-93672.herokuapp.com/login', {email, password})
      .pipe(map(user => {
        // login successful if there's a jwt token in the response
        if (user) {
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          localStorage.setItem('currentUser', JSON.stringify(user));
          console.log(localStorage.getItem('currentUser'));
          this.currentUserSubject.next(user);
        }
        return user;
      }));
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
    localStorage.removeItem('userObject');
    this.currentUserSubject.next(null);
    this.purgeCurrentUser();
    console.log(this.currentUserObject);
  }

  getUserInfo(): Observable<User> {
    return this.http.get<User>('https://calm-waters-93672.herokuapp.com/users/info');
  }

  performGet() {
    this.getUserInfo().subscribe(
      data => {
        console.log('Successfully Fetched info');
        this.currentUserObject = data;
        localStorage.setItem('userObject', JSON.stringify(data));
      },
      ErrorResponse => {
      },
      () => {
        console.log('Here is your current user');
        console.log(this.currentUserObject.email);
        console.log(this.currentUserObject.name);
        console.log(this.currentUserObject.id);
        console.log(this.currentUserObject.password);
        console.log(this.currentUserObject.phone);
      });

  }

  purgeCurrentUser() {
    this.currentUserObject = undefined;
  }
  loadUserFromStorage() {
    const userObject = JSON.parse(localStorage.getItem('userObject'));
    this.currentUserObject = userObject;
  }
}
