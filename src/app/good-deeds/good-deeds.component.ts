import {Component, OnInit} from '@angular/core';
import {DeedService} from '../services/deed.service';
import {Deed} from '../models/deed';

@Component({
  selector: 'app-good-deeds',
  templateUrl: './good-deeds.component.html',
  styleUrls: ['./good-deeds.component.css']
})
export class GoodDeedsComponent implements OnInit {
  deeds: Deed[];
  itemsPerPage = 5;

  constructor(private deedService: DeedService) {
  }

  isListReady: boolean;

  ngOnInit() {
    this.isListReady = false;
    this.getDeeds();

  }

  sortByDate() {
    this.deeds.sort();
  }


  getDeeds() {
    this.deedService.getDeeds().subscribe(
      deeds => {
        console.log(deeds);
        this.deeds = deeds;
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
  showItems(value) {
    this.itemsPerPage = value;

  }

}
