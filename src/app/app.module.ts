import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
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

@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    MapComponent,
    WeatherPreviewComponent,
    WeatherExpandComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyBvQmk94aTqb-lS9TZcYK0XPE_Vj93i6CQ'
    })
  ],
  providers: [NavigationService, WeatherService],
  bootstrap: [AppComponent]
})
export class AppModule { }
