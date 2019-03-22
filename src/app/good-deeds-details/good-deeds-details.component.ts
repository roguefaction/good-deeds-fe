import {Component, Input, OnInit, ElementRef, Renderer2, ViewChild, AfterViewInit} from '@angular/core';
import {DeedService} from '../services/deed.service';
import {AuthenticationService} from './../services/authentication.service';
import {element} from 'protractor';
import {Router} from '@angular/router';
import {User} from '../models/user';
import {forEach} from '@angular/router/src/utils/collection';
import {ModalService} from '../services/modal.service.service';


@Component({
  selector: 'app-good-deeds-details, [app-good-deeds-details]',
  templateUrl: './good-deeds-details.component.html',
  styleUrls: ['./good-deeds-details.component.css']
})
export class GoodDeedsDetailsComponent implements OnInit, AfterViewInit {
  @Input() deed;
  @Input() isOrganized;
  collapseOpen = false;
  currentPage: string;
  bodyText: string;

  @ViewChild('target') targetElement: ElementRef;

  constructor(private deedService: DeedService, public authenticationService: AuthenticationService, public router: Router, public modalService: ModalService) {
  }

  ngOnInit() {
    this.bodyText = "test1";
    let deedToExpand = this.deedService.getDeedToExpand();

    if (deedToExpand === this.deed.title) {
      this.collapseAbout();
      this.deedService.setDeedToExpand(undefined);
      this.targetElement.nativeElement.scrollIntoView({block: 'start', inline: 'nearest', behavior: 'smooth'});
    }

    this.currentPage = this.router.url;
  }

  ngAfterViewInit() {

  }

  collapseAbout() {
    this.collapseOpen = !this.collapseOpen;
  }

  participateInADeed(id: number) {
    this.deedService.participateInADeed(id).subscribe(
      info => {
      },
      error => {
        console.log(error.header.value);
      },
      () => {
        console.log('Operation Complete');
        this.router.navigateByUrl('/RefreshComponent', {skipLocationChange: true}).then(()=>
          this.router.navigate([this.currentPage]));
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
          this.router.navigate([this.currentPage]));
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

  confirmDelete(id: number) {
    this.openModal('custom-modal-1');
    /*if (confirm('Are you sure to delete this deed?')) {
      this.deleteADeed(id);
    }*/
  }

  deleteADeed(id: number) {
    this.deedService.deleteDeed(id).subscribe(
      response => {
        console.log('Succesfully deleted');
      },
      error => {
        console.log('Error while deleting');
      },
      () => {
        this.router.navigateByUrl('/RefreshComponent', {skipLocationChange: true}).then(() =>
          this.router.navigate(['user-profile']));
      }
    );
  }

  openModal(id: string) {
    this.modalService.open(id);
  }

  closeModal(id: string) {
    this.modalService.close(id);
  }

}
