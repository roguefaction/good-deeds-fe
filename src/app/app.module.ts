import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HomePageComponent} from './home-page/home-page.component';
import {GoodDeedsComponent} from './good-deeds/good-deeds.component';
import {SuccessStoriesComponent} from './success-stories/success-stories.component';
import {GalleryComponent} from './gallery/gallery.component';
import {PageNotFoundComponent} from './page-not-found/page-not-found.component';
import {HttpClientModule} from '@angular/common/http';
import {GoodDeedsDetailsComponent} from './good-deeds-details/good-deeds-details.component';
import {RegisterDeedComponent} from './register-deed/register-deed.component';

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    GoodDeedsComponent,
    SuccessStoriesComponent,
    GalleryComponent,
    PageNotFoundComponent,
    GoodDeedsDetailsComponent,
    RegisterDeedComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
