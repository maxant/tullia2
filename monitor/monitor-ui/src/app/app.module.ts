// angular
import { NgModule }       from '@angular/core';
import { BrowserModule }  from '@angular/platform-browser';
import { FormsModule }    from '@angular/forms';
import { HttpClientModule }    from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

// app
import { AppComponent }         from './app.component';
import { DashboardComponent }   from './dashboard/dashboard.component';
import { HeroDetailComponent }  from './hero-detail/hero-detail.component';
import { HeroesComponent }      from './heroes/heroes.component';
import { MessagesComponent }    from './messages/messages.component';
import { AppRoutingModule }     from './app-routing.module';
import { HeroSearchComponent } from './hero-search/hero-search.component';

// primeNg
import {ButtonModule} from 'primeng/button';
import {MessagesModule} from 'primeng/messages';
import {MessageModule} from 'primeng/message';
import {ToastModule} from 'primeng/toast';
import {CheckboxModule} from 'primeng/checkbox';

// font-awesome
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';

@NgModule({
  imports: [

    // angular
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,

    // primeNg
    ButtonModule,
    MessagesModule,
    MessageModule,
    ToastModule,
    CheckboxModule,

    // font-awesome
    FontAwesomeModule
  ],
  declarations: [
    AppComponent,
    DashboardComponent,
    HeroesComponent,
    HeroDetailComponent,
    MessagesComponent,
    HeroSearchComponent
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule {
  constructor() {
    library.add(fas, far);
  }
}
