import { Component, OnInit } from '@angular/core';
import {JobService} from '../services/job.service';
import {Job} from '../models/job';

@Component({
  selector: 'app-good-deeds',
  templateUrl: './good-deeds.component.html',
  styleUrls: ['./good-deeds.component.css']
})
export class GoodDeedsComponent implements OnInit {
  jobs: Job[];
  constructor(private jobService: JobService) { }

  ngOnInit() {
    this.getJobs();
  }

  getJobs() {
    this.jobService.getJobs().subscribe(
      jobs => {
        console.log(jobs);
        this.jobs = jobs;
    },
      error1 => {
        console.log('error');
      },
      () => {
        console.log('completed');
      }
    );
  }

}
