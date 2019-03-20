import {Component, Input, OnInit, ElementRef, Renderer2, ViewChild, AfterViewInit} from '@angular/core';
import {DeedService} from '../services/deed.service';
import {AuthenticationService} from './../services/authentication.service';
import {element} from 'protractor';
import {Router} from '@angular/router';
import {User} from '../models/user';
import {forEach} from '@angular/router/src/utils/collection';


@Component({
  selector: 'app-good-deeds-details, [app-good-deeds-details]',
  templateUrl: './good-deeds-details.component.html',
  styleUrls: ['./good-deeds-details.component.css']
})
export class GoodDeedsDetailsComponent implements OnInit, AfterViewInit {
  @Input() deed;
  collapseOpen = false;

  @ViewChild('target') targetElement: ElementRef;

  constructor(private deedService: DeedService, private authenticationService: AuthenticationService, private router: Router) {
  }

  ngOnInit() {
    let deedToExpand = this.deedService.getDeedToExpand();

    if (deedToExpand === this.deed.title) {
      this.collapseAbout();
      this.deedService.setDeedToExpand(undefined);
      console.log('We have expanded the deed!');
      console.log('target element text:' + this.targetElement.nativeElement.innerText);
      this.targetElement.nativeElement.scrollIntoView({block: 'start', inline: 'nearest', behavior: 'smooth'});
    }
  }

  ngAfterViewInit() {

  }

  collapseAbout() {
    this.collapseOpen = !this.collapseOpen;
  }

  participateInADeed(id: number) {
    this.deedService.participateInADeed(id).subscribe(
      info => {
        console.log('Your participation has been noted');
      },
      error => {
        console.log(error.header.value);
      },
      () => {
        console.log('Operation Complete');
        this.router.navigateByUrl('/RefreshComponent', {skipLocationChange: true}).then(()=>
          this.router.navigate(["good-deeds"]));
      }
    );
  }

  removeParticipation(id: number) {
    this.deedService.cancelParticipation(id).subscribe(
      info => {
        console.log('Your participation has been removed');
      },
      error => {
        console.log(error.header.value);
      },
      () => {
        console.log('Operation Complete');
        this.router.navigateByUrl('/RefreshComponent', {skipLocationChange: true}).then(()=>
          this.router.navigate(["good-deeds"]));
      }
    );
  }

  isUserInArray(userToComp: User, users: User[]): boolean {
    for (let user of users) {
      if (
        user.email === userToComp.email &&
        user.id === userToComp.id &&
        user.name === userToComp.name &&
        user.phone === userToComp.phone
      ) {
        return true;
      } else {
        continue;
      }
    }

  }

}
