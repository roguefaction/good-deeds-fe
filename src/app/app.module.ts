import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomePageComponent } from './home-page/home-page.component';
import { GoodDeedsComponent } from './good-deeds/good-deeds.component';
import { SuccessStoriesComponent } from './success-stories/success-stories.component';
import { GalleryComponent } from './gallery/gallery.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { RegisterFormComponent } from './register-form/register-form.component';
import { JobListComponent } from './job-list/job-list.component';

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    GoodDeedsComponent,
    SuccessStoriesComponent,
    GalleryComponent,
    PageNotFoundComponent,
    RegisterFormComponent,
    JobListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
