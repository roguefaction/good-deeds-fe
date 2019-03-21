import { NgModule } from '@angular/core';
import { Routes, RouterModule} from '@angular/router';
import {HomePageComponent} from './home-page/home-page.component';
import {GoodDeedsComponent} from './good-deeds/good-deeds.component';
import {PageNotFoundComponent} from './page-not-found/page-not-found.component';
import {RegisterDeedComponent} from './register-deed/register-deed.component';
import {CalendarComponent} from './calendar/calendar.component';
import {RegistrationComponent} from './registration/registration.component';
import {LoginComponent} from './login/login.component';
import {UserProfileComponent} from './user-profile/user-profile.component';

// @ts-ignore
// @ts-ignore
const routes: Routes = [
  {path: 'home', component: HomePageComponent},
  {path: 'user-registration', component: RegistrationComponent},
  {path: 'good-deeds', component: GoodDeedsComponent},
  {path: 'register-deed', component: RegisterDeedComponent},
  {path: 'edit-deed/:id', component: RegisterDeedComponent},
  {path: 'calendar', component: CalendarComponent},
  {path: 'login', component: LoginComponent},
  {path: 'user-profile', component: UserProfileComponent},
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path: '**', component: PageNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
