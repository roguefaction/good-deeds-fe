import {Component, OnInit} from '@angular/core';
import {Deed} from '../models/deed';
import {DeedService} from '../services/deed.service';


@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {

  deeds: Deed[];
  isListReady: boolean;
  images: string[] = ['../../assets/images/carousel/image1.jpg',
    '../../assets/images/carousel/image2.jpg', '../../assets/images/carousel/image3.jpeg'];
  constructor(private deedService: DeedService) {
  }


  ngOnInit() {
    this.isListReady = false;
    this.getDeeds();
  }

  getDeeds() {
    this.deedService.getUpcomingDeeds().subscribe(
      deeds => {
        this.deeds = deeds;
      },
      error => {
        console.log('error');
      },
      () => {
        this.isListReady = true;
      }
    );
  }

}
