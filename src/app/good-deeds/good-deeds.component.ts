import {Component, OnInit, AfterViewInit, ViewChild, ElementRef} from '@angular/core';
import {DeedService} from '../services/deed.service';
import {Deed} from '../models/deed';

@Component({
  selector: 'app-good-deeds',
  templateUrl: './good-deeds.component.html',
  styleUrls: ['./good-deeds.component.css']
})
export class GoodDeedsComponent implements OnInit, AfterViewInit {
  deed: Deed[];
  constructor(private jobService: DeedService) {
  }

  isListReady: boolean;

  ngOnInit() {
    this.isListReady = false;
    this.getJobs();

  }
  @ViewChild('myname') testElement1 : ElementRef;

  ngAfterViewInit(): void {
    //console.log("afterinit");
    setTimeout(() => {
      //console.log("afterinit 1 sec");
      //console.log('test value: ' + this.testElement1.nativeElement.innerText);
    }, 1000);
  }

  scroll(el: HTMLElement){
    el.scrollIntoView();
  }


  getJobs() {
    this.jobService.getDeeds().subscribe(
      jobs => {
        console.log(jobs);
        this.deed = jobs;
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
