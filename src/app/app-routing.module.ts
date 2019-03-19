import { NgModule } from '@angular/core';
import { Routes, RouterModule} from '@angular/router';
import {HomePageComponent} from './home-page/home-page.component';
import {GoodDeedsComponent} from './good-deeds/good-deeds.component';
import {PageNotFoundComponent} from './page-not-found/page-not-found.component';
// @ts-ignore
import {RegisterDeedComponent} from './register-deed/register-deed.component';
import {CalendarComponent} from './calendar/calendar.component';
import {LoginComponent} from './login/login.component';

// @ts-ignore
// @ts-ignore
const routes: Routes = [
  {path: 'home', component: HomePageComponent},
  {path: 'good-deeds', component: GoodDeedsComponent},
  {path: 'register-deed', component: RegisterDeedComponent},
  {path: 'calendar', component: CalendarComponent},
  {path: 'login', component: LoginComponent},
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path: '**', component: PageNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
