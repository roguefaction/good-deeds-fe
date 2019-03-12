import {Component, OnInit} from '@angular/core';
import {DeedService} from '../services/deed.service';
import {Deed} from '../models/deed';

@Component({
  selector: 'app-good-deeds',
  templateUrl: './good-deeds.component.html',
  styleUrls: ['./good-deeds.component.css']
})
export class GoodDeedsComponent implements OnInit {
  deed: Deed[];

  constructor(private deedService: DeedService) {
  }

  isListReady: boolean;

  ngOnInit() {
    this.isListReady = false;
    this.getDeeds();

  }


  getDeeds() {
    this.deedService.getDeeds().subscribe(
      deeds => {
        console.log(deeds);
        this.deed = deeds;
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
