import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from '../services/authentication.service';
import {sortBy} from 'sort-by-typescript';
import {Deed} from '../models/deed';
import {User} from '../models/user';
import {DeedSortFlags} from '../models/deedSortFlags';
import {DeedTable} from '../models/deedTable';
import {DeedService} from '../services/deed.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  organizedDeedTable: DeedTable;
  participatingDeedTable: DeedTable;
  currentPage: number;
  userName: string;
  userPhone: string;
  userEmail: string;

  constructor(private authenticationService: AuthenticationService, private deedService: DeedService) {
    this.setSortFlagsToFalse(this.organizedDeedTable.deedSortFlags);
    this.setSortFlagsToFalse(this.participatingDeedTable.deedSortFlags);
  }
  setSortFlagsToFalse(deedSortFlags: DeedSortFlags) {
    deedSortFlags.isTitleSorted = false;
    deedSortFlags.isCitySorted = false;
    deedSortFlags.isPeopleSorted = false;
    deedSortFlags.isDateSorted = false;
    deedSortFlags.isRowSorted = false;
  }

  ngOnInit() {
    this.getUserInfo();

  }

  getUserInfo() {
    if (this.authenticationService.currentUserObject !== undefined ) {
      this.userName = this.authenticationService.currentUserObject.name;
      this.userPhone = this.authenticationService.currentUserObject.phone;
      this.userEmail = this.authenticationService.currentUserObject.email;
    }
  }

  getOrganizedDeeds() {
    this.deedService.getOrganizedDeeds().subscribe(
      response => {
        this.organizedDeedTable.deeds = response;
      },
      error => {
        console.log('Error getting organized deeds');
      }
    );
  }

  getParticipationDeeds(){
    this.deedService.getParticipationDeeds().subscribe(
      response => {
        this.participatingDeedTable.deeds = response;
      },
      error => {
        console.log('Error getting participation deeds');
      }
    );
  }


  sortByCity(deedTable: DeedTable) {
    if (deedTable.deedSortFlags.isCitySorted === false) {
      deedTable.deeds = deedTable.deeds.sort(sortBy('city^'));
      this.setSortFlagsToFalse(deedTable.deedSortFlags);
      deedTable.deedSortFlags.isCitySorted = true;
    } else {
      deedTable.deeds = deedTable.deeds.sort(sortBy('date'));
      deedTable.deedSortFlags.isCitySorted = false;
    }
  }
  sortByDate(deedTable: DeedTable) {
    if (deedTable.deedSortFlags.isDateSorted === false) {
      deedTable.deeds = deedTable.deeds.sort(sortBy('date-'));
      this.setSortFlagsToFalse(deedTable.deedSortFlags);
      deedTable.deedSortFlags.isDateSorted = true;
    } else {
      deedTable.deeds = deedTable.deeds.sort(sortBy('date'));
      deedTable.deedSortFlags.isDateSorted = false;
    }
  }
  sortByPeople(deedTable: DeedTable) {
    if (deedTable.deedSortFlags.isPeopleSorted === false) {
      deedTable.deeds = deedTable.deeds.sort(sortBy('maxPeople^'));
      this.setSortFlagsToFalse(deedTable.deedSortFlags);
      deedTable.deedSortFlags.isPeopleSorted = true;
    } else {
      deedTable.deeds = deedTable.deeds.sort(sortBy('date^'));
      deedTable.deedSortFlags.isPeopleSorted = false;
    }
  }
  sortByTitle(deedTable: DeedTable) {
    if (deedTable.deedSortFlags.isCitySorted === false) {
      deedTable.deeds = deedTable.deeds.sort(sortBy('title^'));
      this.setSortFlagsToFalse(deedTable.deedSortFlags);
      deedTable.deedSortFlags.isTitleSorted = true;
    } else {
      deedTable.deeds = deedTable.deeds.sort(sortBy('date^'));
      deedTable.deedSortFlags.isTitleSorted = false;
    }
  }
}
