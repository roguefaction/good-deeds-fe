import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {User} from '../models/user';

@Injectable({ providedIn: 'root' })
export class UserService {
  constructor(private http: HttpClient) {
  }
  addUser(user: User) {
    return this.http.post('https://calm-waters-93672.herokuapp.com/users/register', user);
  }

  getAll() {
    return this.http.get<User[]>('https://calm-waters-93672.herokuapp.com/users');
  }


}
