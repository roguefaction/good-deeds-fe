import { Component } from '@angular/core';
import {AuthenticationService} from './services/authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'good-deeds-fe';
  navbarOpen = false;

  constructor(private authenticationService: AuthenticationService ) {

  }

  toggleNavbar() {
    this.navbarOpen = !this.navbarOpen;
  }

}
