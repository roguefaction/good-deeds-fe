import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-good-deeds-details, [app-good-deeds-details]',
  templateUrl: './good-deeds-details.component.html',
  styleUrls: ['./good-deeds-details.component.css']
})
export class GoodDeedsDetailsComponent implements OnInit {
  @Input() job;
  collapseOpen = false;
  constructor() { }

  ngOnInit() {
  }
  collapseAbout() {
    this.collapseOpen = !this.collapseOpen;
  }

  consoleSomething() {
    console.log('MYGTUKAS VEIKIA');
  }
}
