import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MapComponent } from './map/map.component';
import { WeatherExpandComponent } from './weather/weather-expand/weather-expand.component';
import { SchoolsExpandComponent } from './schools/schools-expand/schools-expand.component';
import { RestaurantsExpandComponent } from './restaurants/restaurants-expand/restaurants-expand.component';
import { CrimeExpandComponent } from './crime/crime-expand/crime-expand.component';

const appRoutes: Routes = [
  {path: '', component: MapComponent, children: [
    {path: 'weather', component: WeatherExpandComponent },
    {path: 'schools', component: SchoolsExpandComponent },
    {path: 'restaurants', component: RestaurantsExpandComponent },
    {path: 'crime', component: CrimeExpandComponent },
  ]}
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})

export class AppRoutingModule {

}
