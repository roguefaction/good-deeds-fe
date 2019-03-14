import {Component, OnInit, AfterViewInit, ViewChild, ElementRef} from '@angular/core';
import {DeedService} from '../services/deed.service';
import {Deed} from '../models/deed';

@Component({
  selector: 'app-good-deeds',
  templateUrl: './good-deeds.component.html',
  styleUrls: ['./good-deeds.component.css']
})
export class GoodDeedsComponent implements OnInit, AfterViewInit {
  deeds: Deed[];
  itemsPerPage = 5;
  p: number;
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
  ngAfterViewInit(): void {
  }

  scroll(el: HTMLElement){
    el.scrollIntoView();
  }


  getDeeds() {
    this.deedService.getDeeds().subscribe(
      deeds => {
        console.log(deeds);
        this.deeds = deeds;
      },
      ErrorResponse => {
        alert(ErrorResponse.error.message);
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
