import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from '../services/authentication.service';
import {sortBy} from 'sort-by-typescript';
import {Deed} from '../models/deed';
import {User} from '../models/user';
import {DeedService} from '../services/deed.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  currentPage: number;
  userName: string;
  userPhone: string;
  userEmail: string;
  organizedDeeds: Deed[];
  participationDeeds: Deed[];

  isListReady = Boolean;

  currentPageO: number;
  itemsPerPageO: number;
  isTitleSortedO = false;
  isCitySortedO = false;
  isPeopleSortedO = false;
  isDateSortedO = false;
  isRowSortedO = false;

  currentPageP: number;
  itemsPerPageP: number;
  isTitleSortedP = false;
  isCitySortedP = false;
  isPeopleSortedP = false;
  isDateSortedP = false;
  isRowSortedP = false;

  constructor(private authenticationService: AuthenticationService, private deedService: DeedService, private router: Router) {

  }

  ngOnInit() {
    this.itemsPerPageO = 5;
    this.itemsPerPageP = 5;
    this.getUserInfo();
    this.getOrganizedDeeds();
    this.getParticipationDeeds();
  }

  getUserInfo() {
    if (this.authenticationService.currentUserObject !== undefined) {
      this.userName = this.authenticationService.currentUserObject.name;
      this.userPhone = this.authenticationService.currentUserObject.phone;
      this.userEmail = this.authenticationService.currentUserObject.email;
    }
  }


  getOrganizedDeeds() {
    this.deedService.getOrganizedDeeds().subscribe(
      response => {
        this.organizedDeeds = response;
      },
      error => {
        console.log('Error getting organized deeds');
      }
    );
  }

  getParticipationDeeds() {
    this.deedService.getParticipationDeeds().subscribe(
      response => {
        this.participationDeeds = response;
      },
      error => {
        console.log('Error getting participation deeds');
      }
    );
  }

  /*
  *
  *  Will refactor sorting methods later, this is a quick solution for now
  *
  * */

  setOrganizedFlagsFalse() {
    this.isCitySortedO = false;
    this.isTitleSortedO = false;
    this.isPeopleSortedO = false;
    this.isDateSortedO = false;
    this.isRowSortedO = false;
  }

  setParticipationFlagsFalse() {
    this.isCitySortedP = false;
    this.isTitleSortedP = false;
    this.isPeopleSortedP = false;
    this.isDateSortedP = false;
    this.isRowSortedP = false;
  }

  sortByCityO() {
    if (this.isCitySortedO === false) {
      this.organizedDeeds = this.organizedDeeds.sort(sortBy('city^'));
      this.setOrganizedFlagsFalse();
      this.isCitySortedO = true;
    } else {
      this.organizedDeeds = this.organizedDeeds.sort(sortBy('date'));
      this.isCitySortedO = false;
    }
  }

  sortByDateO() {
    if (this.isDateSortedO === false) {
      this.organizedDeeds = this.organizedDeeds.sort(sortBy('-date'));
      this.setOrganizedFlagsFalse();
      this.isDateSortedO = true;
    } else {
      this.organizedDeeds = this.organizedDeeds.sort(sortBy('date'));
      this.isDateSortedO = false;
    }
  }

  sortByPeopleO() {
    if (this.isPeopleSortedO === false) {
      this.organizedDeeds = this.organizedDeeds.sort(sortBy('maxPeople^'));
      this.setOrganizedFlagsFalse();
      this.isPeopleSortedO = true;
    } else {
      this.organizedDeeds = this.organizedDeeds.sort(sortBy('date'));
      this.isPeopleSortedO = false;
    }
  }

  sortByTitleO() {
    if (this.isTitleSortedO === false) {
      this.organizedDeeds = this.organizedDeeds.sort(sortBy('-title^'));
      this.setOrganizedFlagsFalse();
      this.isTitleSortedO = true;
    } else {
      this.organizedDeeds = this.organizedDeeds.sort(sortBy('date'));
      this.isTitleSortedO = false;
    }
  }


  sortByCityP() {
    if (this.isCitySortedP === false) {
      this.participationDeeds = this.participationDeeds.sort(sortBy('city^'));
      this.setParticipationFlagsFalse();
      this.isCitySortedP = true;
    } else {
      this.participationDeeds = this.participationDeeds.sort(sortBy('date'));
      this.isCitySortedP = false;
    }
  }

  sortByDateP() {
    if (this.isDateSortedP === false) {
      this.participationDeeds = this.participationDeeds.sort(sortBy('-date'));
      this.setParticipationFlagsFalse();
      this.isDateSortedP = true;
    } else {
      this.participationDeeds = this.participationDeeds.sort(sortBy('date'));
      this.isDateSortedP = false;
    }
  }

  sortByPeopleP() {
    if (this.isPeopleSortedP === false) {
      this.participationDeeds = this.participationDeeds.sort(sortBy('maxPeople^'));
      this.setParticipationFlagsFalse();
      this.isPeopleSortedP = true;
    } else {
      this.participationDeeds = this.participationDeeds.sort(sortBy('date'));
      this.isPeopleSortedP = false;
    }
  }

  sortByTitleP() {
    if (this.isTitleSortedP === false) {
      this.participationDeeds = this.participationDeeds.sort(sortBy('title^'));
      this.setParticipationFlagsFalse();
      this.isTitleSortedP = true;

    } else {
      this.participationDeeds = this.participationDeeds.sort(sortBy('date'));
      this.isTitleSortedP = false;
    }
  }

}
