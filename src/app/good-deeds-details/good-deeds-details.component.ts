import {Component, Input, OnInit} from '@angular/core';
import {DeedService} from '../services/deed.service';
import {element} from 'protractor';

@Component({
  selector: 'app-good-deeds-details, [app-good-deeds-details]',
  templateUrl: './good-deeds-details.component.html',
  styleUrls: ['./good-deeds-details.component.css']
})
export class GoodDeedsDetailsComponent implements OnInit {
  @Input() deed;
  collapseOpen = false;
  constructor(private deedService: DeedService) { }
  // TODO: call service to check if deed should be expanded

  ngOnInit() {
    let deedToExpand = this.deedService.getDeedToExpand();
    if(deedToExpand === this.deed.title){
      this.collapseAbout();
      this.deedService.setDeedToExpand(undefined);

    }
  }
  collapseAbout() {
    this.collapseOpen = !this.collapseOpen;
  }
}
