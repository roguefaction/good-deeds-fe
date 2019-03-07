import {Component, Input, OnInit} from '@angular/core';
import {DataService} from '../services/data.service';

@Component({
  selector: 'app-good-deeds-details, [app-good-deeds-details]',
  templateUrl: './good-deeds-details.component.html',
  styleUrls: ['./good-deeds-details.component.css']
})


export class GoodDeedsDetailsComponent implements OnInit {
  @Input() job;
  collapseOpen = false;
  constructor(private data: DataService) { }

  ngOnInit() {
    this.data.currentMessage.subscribe(job => this.job);
  }
  collapseAbout() {
    this.collapseOpen = !this.collapseOpen;
  }
}
