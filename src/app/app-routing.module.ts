import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MapComponent } from './map/map.component';
import { WeatherExpandComponent } from './weather/weather-expand/weather-expand.component';
import { RestaurantsExpandComponent } from './restaurants/restaurants-expand/restaurants-expand.component';
import { RestaurantsDetailComponent } from './restaurants/restaurants-detail/restaurants-detail.component';
import { ActivitiesExpandComponent } from './activities/activities-expand/activities-expand.component';
import { ActivitiesDetailComponent } from './activities/activities-detail/activities-detail.component';
import { TransportationExpandComponent } from './transportation/transportation-expand/transportation-expand.component';

const appRoutes: Routes = [
  {path: '', component: MapComponent, children: [
    {path: 'weather', component: WeatherExpandComponent },
    {path: 'restaurants', component: RestaurantsExpandComponent, children: [
      {path: 'detail', component: RestaurantsDetailComponent}
    ]},
    {path: 'activities', component: ActivitiesExpandComponent, children: [
      {path: 'detail', component: ActivitiesDetailComponent}
    ]},
    {path: 'transportation', component: TransportationExpandComponent},
  ]}
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})

export class AppRoutingModule {

}
