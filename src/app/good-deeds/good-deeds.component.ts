import {Component, OnInit, AfterViewInit, ViewChild, ElementRef} from '@angular/core';
import {DeedService} from '../services/deed.service';
import {Deed} from '../models/deed';
import {sortBy} from 'sort-by-typescript';
import {AuthenticationService} from '../services/authentication.service';
import {User} from '../models/user';

@Component({
  selector: 'app-good-deeds',
  templateUrl: './good-deeds.component.html',
  styleUrls: ['./good-deeds.component.css']
})
export class GoodDeedsComponent implements OnInit, AfterViewInit {
  deeds: Deed[];
  itemsPerPage = 5;
  currentPage: number;
  isTitleSorted = false;
  isCitySorted = false;
  isPeopleSorted = false;
  isDateSorted = false;
  isRowSorted = false;

  constructor(private deedService: DeedService, private authenticationService: AuthenticationService) {
  }

  isListReady: boolean;

  ngOnInit() {
    this.isListReady = false;
    this.getDeeds();
  }

  ngAfterViewInit(): void {

    setTimeout(() => {
      this.currentPage = 1;
      if (this.deedService.getPage() !== 0) {
        this.currentPage = this.deedService.getPage();
        this.deedService.setPage(0);
      } else {
      }
    }, 500);

  }

  scroll(el: HTMLElement) {
    el.scrollIntoView();
  }

  getDeeds() {
    this.deedService.getUpcomingDeeds().subscribe(
      deeds => {
        this.deeds = deeds;
      },
      ErrorResponse => {
        alert(ErrorResponse.error.message);
      },
      () => {
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
      this.isTitleSorted = false;
      this.isPeopleSorted = false;
      this.isDateSorted = false;
      this.isRowSorted = false;
    } else {
      this.deeds = this.deeds.sort(sortBy('date'));
      this.isCitySorted = false;
    }
  }

  sortByDate() {
    if (this.isDateSorted === false) {
      this.deeds = this.deeds.sort(sortBy('-date'));
      this.isDateSorted = true;
      this.isCitySorted = false;
      this.isTitleSorted = false;
      this.isPeopleSorted = false;
      this.isRowSorted = false;
    } else {
      this.deeds = this.deeds.sort(sortBy('date'));
      this.isDateSorted = false;
    }
  }

  sortByPeople() {
    if (this.isPeopleSorted === false) {
      this.deeds = this.deeds.sort(sortBy('maxPeople^'));
      this.isPeopleSorted = true;
      this.isDateSorted = false;
      this.isCitySorted = false;
      this.isTitleSorted = false;
      this.isRowSorted = false;
    } else {
      this.deeds = this.deeds.sort(sortBy('date^'));
      this.isPeopleSorted = false;
    }
  }

  sortByTitle() {
    if (this.isTitleSorted === false) {
      this.deeds = this.deeds.sort(sortBy('title^'));
      this.isTitleSorted = true;
      this.isPeopleSorted = false;
      this.isDateSorted = false;
      this.isCitySorted = false;
      this.isRowSorted = false;
    } else {
      this.deeds = this.deeds.sort(sortBy('date^'));
      this.isTitleSorted = false;
    }
  }


}
