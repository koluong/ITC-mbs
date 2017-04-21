import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AppRoutingModule } from './app-routing.module';
import { AgmCoreModule } from 'angular2-google-maps/core';

import { NavigationService } from './shared/navigation.service';
import { WeatherService } from './weather/weather.service';
import { AboutService } from './about/about.service';
import { RestaurantsService } from './restaurants/restaurants.service';
import { ActivitiesService } from './activities/activities.service';
import { TransportationService } from './transportation/transportation.service';
import { DistanceService } from './shared/distance.service';
import { PropertiesService } from './properties/properties.service';

import { AppComponent } from './app.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { MapComponent } from './map/map.component';
import { WeatherPreviewComponent } from './weather/weather-preview.component';
import { WeatherExpandComponent } from './weather/weather-expand/weather-expand.component';
import { RestaurantsComponent } from './restaurants/restaurants.component';
import { RestaurantsExpandComponent } from './restaurants/restaurants-expand/restaurants-expand.component';
import { AboutComponent } from './about/about.component';
import { RestaurantsDetailComponent } from './restaurants/restaurants-detail/restaurants-detail.component';

import { ShortenPipe } from './shared/shorten.pipe';
import { ActivitiesComponent } from './activities/activities.component';
import { LogoCardComponent } from './logo-card/logo-card.component';
import { ActivitiesExpandComponent } from './activities/activities-expand/activities-expand.component';
import { ActivitiesDetailComponent } from './activities/activities-detail/activities-detail.component';
import { TransportationComponent } from './transportation/transportation.component';
import { TransportationExpandComponent } from './transportation/transportation-expand/transportation-expand.component';
import { PropertiesComponent } from './properties/properties.component';
import { PropertiesExpandComponent } from './properties/properties-expand/properties-expand.component';

@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    MapComponent,
    WeatherPreviewComponent,
    WeatherExpandComponent,
    RestaurantsComponent,
    RestaurantsExpandComponent,
    AboutComponent,
    RestaurantsDetailComponent,
    ShortenPipe,
    ActivitiesComponent,
    LogoCardComponent,
    ActivitiesExpandComponent,
    ActivitiesDetailComponent,
    TransportationComponent,
    TransportationExpandComponent,
    PropertiesComponent,
    PropertiesExpandComponent
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
  providers: [
    NavigationService,
    WeatherService,
    AboutService,
    RestaurantsService,
    ActivitiesService,
    TransportationService,
    DistanceService,
    PropertiesService],
  bootstrap: [AppComponent]
})
export class AppModule { }
