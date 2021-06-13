import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { ListComponent } from './list/list.component';
import { SearchComponent } from './search/search.component';
import { NewsletterComponent } from './newsletter/newsletter.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ListComponent,
    SearchComponent,
    NewsletterComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot([
      {
        path: '',
        component: HomeComponent
      },

      {
        path: 'candidatelist',
        component: ListComponent
      },

      {
        path: 'search',
        component: SearchComponent
      },

      {
        path: 'newsletter',
        component: NewsletterComponent
      }

      ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
