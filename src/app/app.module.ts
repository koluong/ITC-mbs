import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AppRoutingModule } from './app-routing.module';
import { AgmCoreModule } from 'angular2-google-maps/core';

import { AppComponent } from './app.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { MapComponent } from './map/map.component';
import { WeatherPreviewComponent } from './weather/weather-preview.component';
import { WeatherExpandComponent } from './weather/weather-expand/weather-expand.component';

import { NavigationService } from './shared/navigation.service';
import { WeatherService } from './weather/weather.service';
import { RestaurantsComponent } from './restaurants/restaurants.component';
import { CrimeComponent } from './crime/crime.component';
import { SchoolsComponent } from './schools/schools.component';
import { CrimeExpandComponent } from './crime/crime-expand/crime-expand.component';
import { SchoolsExpandComponent } from './schools/schools-expand/schools-expand.component';
import { RestaurantsExpandComponent } from './restaurants/restaurants-expand/restaurants-expand.component';

@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    MapComponent,
    WeatherPreviewComponent,
    WeatherExpandComponent,
    RestaurantsComponent,
    CrimeComponent,
    SchoolsComponent,
    CrimeExpandComponent,
    SchoolsExpandComponent,
    RestaurantsExpandComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    AppRoutingModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyBvQmk94aTqb-lS9TZcYK0XPE_Vj93i6CQ',
      libraries: ["places"]
    })
  ],
  providers: [NavigationService, WeatherService],
  bootstrap: [AppComponent]
})
export class AppModule { }
