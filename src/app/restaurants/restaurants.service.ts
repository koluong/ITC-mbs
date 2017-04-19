import { Injectable, OnDestroy } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { Subject } from 'rxjs/Subject';
import 'rxjs/Rx';

import { NavigationService } from '../shared/navigation.service';

@Injectable()
export class RestaurantsService implements OnDestroy{
  //SUBSCRIPTIONS
  searchDataFetched = new Subject<any>();
  subscription: Subscription;

  //DATA
  latitude: number = 34.059144;
  longitude: number = -117.820072;
  restaurantData = [];

  //INITIALIZATION
  constructor(private http: Http,
              private navService: NavigationService) {
                this.setCoordsSubscription();
              }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  //API CALL
  restaurantsSearch() {
    var url = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json?';
    var key = '&key=AIzaSyBvQmk94aTqb-lS9TZcYK0XPE_Vj93i6CQ'
    var params = 'type=restaurant&radius=10000&location='
          + this.latitude + ',' + this.longitude;

    return this.http.get(url + params + key)
      .map(
        (response: Response) => {
          console.log(response.json());
          this.restaurantData = response.json()['results'].splice(0, 10);
          return this.restaurantData;
        })
        .catch((error) => Observable.throw(error.json().error));
  }
  //SUBSCRIBE TO NEW COORDINATES
  setCoordsSubscription() {
    this.subscription = this.navService.coordsChanged
      .subscribe(
        (data = []) => {
          this.latitude = data[0];
          this.longitude = data[1];
          this.searchDataFetched.next('restsearch');
        });
  }
  //SENDS RESTAURANT DATA
  fetchRestaurantData() {
    return this.restaurantData;
  }
}
