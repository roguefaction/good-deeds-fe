import {Component, OnInit} from '@angular/core';
import {DeedService} from '../services/deed.service';
import {Deed} from '../models/deed';

@Component({
  selector: 'app-good-deeds',
  templateUrl: './good-deeds.component.html',
  styleUrls: ['./good-deeds.component.css']
})
export class GoodDeedsComponent implements OnInit {
  jobs: Deed[];

  constructor(private jobService: DeedService) {
  }

  isListReady: boolean;

  ngOnInit() {
    this.isListReady = false;
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
        this.isListReady = true;
      }
    );
  }
}
