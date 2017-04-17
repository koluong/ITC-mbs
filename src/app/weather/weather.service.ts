import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import 'rxjs/Rx';

@Injectable()
export class WeatherService {
  weatherDataFetched = new Subject<any>();

  private URL = 'https://api.darksky.net/forecast';
  private API_KEY = '/d3fd5f56820c4985a6ac1fd0ec1208c8/'
  queryParams = '37.8267,-122.4233';

  weatherData: {};


  constructor(private http: Http) {}

  retrieveWeatherData(): Observable<any> {
    return this.http.get(this.URL + this.API_KEY + this.queryParams)
              .map(
                (response: Response) => {
                  this.weatherData = response.json();
                  return this.weatherData;
                })
                .catch((error) => Observable.throw(error.json().error));

  }
}
