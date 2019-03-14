import { NgModule } from '@angular/core';
import { Routes, RouterModule} from '@angular/router';
import {HomePageComponent} from './home-page/home-page.component';
import {GoodDeedsComponent} from './good-deeds/good-deeds.component';
import {SuccessStoriesComponent} from './success-stories/success-stories.component';
import {GalleryComponent} from './gallery/gallery.component';
import {PageNotFoundComponent} from './page-not-found/page-not-found.component';
import {RegisterDeedComponent} from './register-deed/register-deed.component';

// @ts-ignore
// @ts-ignore
const routes: Routes = [
  {path: 'home', component: HomePageComponent},
  {path: 'good-deeds', component: GoodDeedsComponent},
  {path: 'success-stories', component: SuccessStoriesComponent},
  {path: 'gallery', component: GalleryComponent},
  {path: 'register-deed', component: RegisterDeedComponent},
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path: '**', component: PageNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
