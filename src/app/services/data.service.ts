import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import {Job} from '../models/job';

@Injectable({
  providedIn: 'root'
})

@Injectable()
export class DataService {

  job: Job;

  private messageSource = new BehaviorSubject(this.job);
  currentMessage = this.messageSource.asObservable();

  constructor() { }

  changeMessage(job: Job) {
    this.messageSource.next(job);
  }

}
