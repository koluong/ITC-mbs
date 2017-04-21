import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { Subject } from 'rxjs/Subject';
import 'rxjs/Rx';

import { NavigationService } from './navigation.service';

@Injectable()
export class DistanceService {

  originLat = '34.059144';
  originLng = '-117.820072';
  distanceData = [];

  constructor(private http: Http,
              private navService: NavigationService) { }

  calculateDistance(coords: string[]) {
    let url = 'https://crossorigin.me/https://maps.googleapis.com/maps/api/distancematrix/json?units=imperial';
    let origin = '&origins=' + this.originLat + "," + this.originLng;
    let key = '&key=AIzaSyBvQmk94aTqb-lS9TZcYK0XPE_Vj93i6CQ';
    let destination = '&destinations=';

    for (let data of coords) {
      destination = destination.concat(data);
    }

    return this.http.get(url + origin + key + destination)
      .map(
        (response: Response) => {
          return response.json()['rows'][0].elements;
        });
  }
}
