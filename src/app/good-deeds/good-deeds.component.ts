import {Component, OnInit, AfterViewInit, ViewChild, ElementRef} from '@angular/core';
import {DeedService} from '../services/deed.service';
import {Deed} from '../models/deed';

@Component({
  selector: 'app-good-deeds',
  templateUrl: './good-deeds.component.html',
  styleUrls: ['./good-deeds.component.css']
})
export class GoodDeedsComponent implements OnInit, AfterViewInit {
  deeds: Deed[];
  itemsPerPage = 5;
  currentPage: number;
  constructor(private deedService: DeedService) {
  }

  isListReady: boolean;

  ngOnInit() {
    this.isListReady = false;
    this.getDeeds();


  }

  sortByDate() {
    this.deeds.sort();
  }
  ngAfterViewInit(): void {

    setTimeout( () => {
      this.currentPage = 1;
      if (this.deedService.getPage() !== 0) {
        console.log('setting page, old page: ' + this.currentPage + ', new page: ' + this.deedService.getPage());
        this.currentPage = this.deedService.getPage();
        this.deedService.setPage(0);
      } else {
        console.log('NOT SETTING NEW PAGE');
      }
    }, 500 );


  }

  first(){
    this.currentPage = 0;
  }
  second(){
    this.currentPage = 2;
  }

  scroll(el: HTMLElement){
    el.scrollIntoView();
  }


  getDeeds() {
    this.deedService.getUpcomingDeeds().subscribe(
      deeds => {
        console.log(deeds);
        this.deeds = deeds;
      },
      error1 => {
        console.log('error');
      },
      () => {
        console.log('completed');
        this.isListReady = true;
      }
    );
  }
  showItems(value) {
    this.itemsPerPage = value;

  }

}
