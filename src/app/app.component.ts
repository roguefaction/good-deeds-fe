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
  dropdownOpen = false;


  constructor(public authenticationService: AuthenticationService ) {
    // this.authenticationService.loadUserFromStorage();
  }

  toggleNavbar() {
    this.navbarOpen = !this.navbarOpen;
  }
  userDropdown() {
    this.dropdownOpen = !this.dropdownOpen;

  }

}
