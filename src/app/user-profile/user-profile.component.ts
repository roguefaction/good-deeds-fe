import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from '../services/authentication.service';
import {sortBy} from 'sort-by-typescript';
import {Deed} from '../models/deed';
import {User} from '../models/user';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  deeds: Deed[];
  itemsPerPage = 5;
  currentPage: number;
  isTitleSorted = false;
  isCitySorted = false;
  isPeopleSorted = false;
  isDateSorted = false;
  isRowSorted = false;
  userName: string;
  userPhone: string;
  constructor(private authenticationService: AuthenticationService) {

  }

  ngOnInit() {

  }

  getUserInfo() {
    if (this.authenticationService.currentUserObject !== null ) {
      this.userName = this.authenticationService.currentUserObject.name;
      this.userPhone = this.authenticationService.currentUserObject.phone;
    }
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
