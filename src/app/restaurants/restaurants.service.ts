import { Injectable, OnDestroy } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { Subject } from 'rxjs/Subject';
import 'rxjs/Rx';

import { NavigationService } from '../shared/navigation.service';

@Injectable()
export class RestaurantsService implements OnDestroy{
  //SUBSCRIPTIONS
  searchDataFetched = new Subject<any>();
  detailDataFetched = new Subject<any>();
  subscription: Subscription;

  //DATA
  latitude: number = 34.059144;
  longitude: number = -117.820072;
  restaurantData = [];
  detailData = [];

  //INITIALIZATION
  constructor(private http: Http,
              private navService: NavigationService) {
                this.setCoordsSubscription();
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
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
  //API CALL
  restaurantsSearch() {
    var url = 'https://crossorigin.me/https://maps.googleapis.com/maps/api/place/nearbysearch/json?';
    var key = '&key=AIzaSyBvQmk94aTqb-lS9TZcYK0XPE_Vj93i6CQ'
    var params = 'type=restaurant&rankby=distance&location='
          + this.latitude + ',' + this.longitude;

    return this.http.get(url + params + key)
      .map(
        (response: Response) => {
          if (response.json()['results'].length >= 15) {
            this.restaurantData = response.json()['results'].splice(0, 15);
          } else {
            this.restaurantData = response.json()['results'];
          }
          return this.restaurantData;
        })
        .catch((error) => Observable.throw(error.json().error));
  }

  restaurantDetailGet(place_id) {
    var url = 'https://crossorigin.me/https://maps.googleapis.com/maps/api/place/details/json?';
    var key = 'key=AIzaSyBvQmk94aTqb-lS9TZcYK0XPE_Vj93i6CQ';
    var param = '&placeid='
    this.http.get(url + key + param + place_id)
      .subscribe(
        (response: Response) => {
          this.detailData = response.json().result;
          this.detailDataFetched.next(this.detailData);
        });
  }

  //SENDS RESTAURANT DATA
  fetchRestaurantData() {
    return this.restaurantData;
  }
}
