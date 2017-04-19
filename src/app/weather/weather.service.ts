import { Injectable, OnDestroy } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { Subscription } from 'rxjs';
import 'rxjs/Rx';

import { NavigationService } from '../shared/navigation.service';

@Injectable()
export class WeatherService implements OnDestroy {
  weatherDataFetched = new Subject<any>();

  subscription: Subscription;

  private URL = 'https://api.darksky.net/forecast';
  private API_KEY = '/d3fd5f56820c4985a6ac1fd0ec1208c8/'
  latitude: number = 34.059144;
  longitude: number = -117.820072;

  weatherData: {};

  constructor(private http: Http,
              private navService: NavigationService) {
              this.setCoordsSubscription();
            }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  retrieveWeatherData(): Observable<any> {
    return this.http.get(this.URL + this.API_KEY + this.latitude + ',' + this.longitude)
              .map(
                (response: Response) => {
                  this.weatherData = response.json();
                  return this.weatherData;
                })
                .catch((error) => Observable.throw(error.json().error));

  }
  fetchWeatherData(){
    return this.weatherData;
  }
  setCoordsSubscription() {
    this.subscription = this.navService.coordsChanged
      .subscribe(
        (data = []) => {
          this.latitude = data[0];
          this.longitude = data[1];
          this.weatherDataFetched.next('new data inc');
        }
      )
  }
}
