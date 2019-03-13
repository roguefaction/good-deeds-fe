import {Component, Input, OnInit, ElementRef, Renderer2, ViewChild, AfterViewInit} from '@angular/core';
import {DeedService} from '../services/deed.service';


@Component({
  selector: 'app-good-deeds-details, [app-good-deeds-details]',
  templateUrl: './good-deeds-details.component.html',
  styleUrls: ['./good-deeds-details.component.css']
})
export class GoodDeedsDetailsComponent implements OnInit, AfterViewInit {
  @Input() deed;
  collapseOpen = false;

  @ViewChild('target') targetElement: ElementRef;

  constructor(private deedService: DeedService) { }

  ngOnInit() {
    let deedToExpand = this.deedService.getDeedToExpand();

    if(deedToExpand === this.deed.title){
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
}
