import {Component, OnInit, AfterViewInit, ViewChild, ElementRef} from '@angular/core';
import {DeedService} from '../services/deed.service';
import {Deed} from '../models/deed';
import { sortBy } from 'sort-by-typescript';

@Component({
  selector: 'app-good-deeds',
  templateUrl: './good-deeds.component.html',
  styleUrls: ['./good-deeds.component.css']
})
export class GoodDeedsComponent implements OnInit, AfterViewInit {
  deeds: Deed[];
  itemsPerPage = 5;
  p: number;
  isTitleSorted = false;
  isCitySorted = false;
  isPeopleSorted = false;
  isDateSorted = false;

  constructor(private deedService: DeedService) {
  }

  isListReady: boolean;

  ngOnInit() {
    this.isListReady = false;
    this.getDeeds();

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

  sortByCity() {
    if (this.isCitySorted === false) {
      this.deeds = this.deeds.sort(sortBy('city^'));
      this.isCitySorted = true;
    }else {
      this.deeds = this.deeds.sort(sortBy('-city^'));
      this.isCitySorted = false;
    }
  }
  sortByDate() {
    if (this.isDateSorted === false) {
      this.deeds = this.deeds.sort(sortBy('-date'));
      this.isDateSorted = true;
    }else {
      this.deeds = this.deeds.sort(sortBy('date'));
      this.isDateSorted = false;
    }
  }
  sortByPeople() {
    if (this.isPeopleSorted === false) {
      this.deeds = this.deeds.sort(sortBy('maxPeople^'));
      this.isPeopleSorted = true;
    }else {
      this.deeds = this.deeds.sort(sortBy('-maxPeople^'));
      this.isPeopleSorted = false;
    }
  }
  sortByTitle() {
    if (this.isTitleSorted === false) {
      this.deeds = this.deeds.sort(sortBy('title^'));
      this.isTitleSorted = true;
    }else {
      this.deeds = this.deeds.sort(sortBy('-title^'));
      this.isTitleSorted = false;
    }
  }
}
