import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { Subscription } from 'rxjs';
import 'rxjs/Rx';

import { NavigationService } from '../shared/navigation.service';

@Injectable()
export class WeatherService {
  weatherDataFetched = new Subject<any>();

  subscription: Subscription;

  private URL = 'https://api.darksky.net/forecast';
  private API_KEY = '/d3fd5f56820c4985a6ac1fd0ec1208c8/'
  queryParams = '37.8267,-122.4233';
  latitude: number = 51.5033640;
  longitude: number = -0.1276250;

  weatherData: {};


  constructor(private http: Http,
              private navService: NavigationService) {
              this.setCoordsSubscription();
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

  setCoordsSubscription() {
    this.navService.coordsChanged
      .subscribe(
        (data = []) => {
          this.latitude = data[0];
          this.longitude = data[1];
          this.weatherDataFetched.next('new data inc');
        }
      )
  }
}
