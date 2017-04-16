import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MapComponent } from './map/map.component';
import { WeatherExpandComponent } from './weather/weather-expand/weather-expand.component';

const appRoutes: Routes = [
  {path: '', component: MapComponent, children: [
    {path: 'weather', component: WeatherExpandComponent }
  ]}
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})

export class AppRoutingModule {

}
