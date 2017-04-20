import { Injectable, OnDestroy } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { Subject } from 'rxjs/Subject';
import 'rxjs/Rx';

import { NavigationService } from '../shared/navigation.service';

@Injectable()
export class ActivitiesService implements OnDestroy{
  activityDataFetched = new Subject<any>();
  activityDetailFetched = new Subject<any>();
  subscription: Subscription;

  //DATA
  location: string = "Pomona CA";
  activityData = [];
  activityDetailData = [];

  constructor(private http: Http,
              private navService: NavigationService) {
    //SUBSCRIVE TO NEW LOCATION
    this.subscription = this.navService.locationChanged
      .subscribe((location) => {
        this.location = location;
        this.activityDataFetched.next('act data fetched');
    });
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  //API CALLS
  getActivityData() {
    let url = 'https://maps.googleapis.com/maps/api/place/textsearch/json?';
    let key = '&language=en&key=AIzaSyBvQmk94aTqb-lS9TZcYK0XPE_Vj93i6CQ';
    let param = '&query=point+of+interests+' + this.location;

    return this.http.get(url + key + param)
      .map(
        (response: Response) => {
          if(response.json()['results'].length >= 15){
            this.activityData = response.json()['results'].splice(0 ,15);
          } else {
            this.activityData = response.json()['results'];
          }
          return this.activityData;
        }).catch((error) => Observable.throw(error.json().error));
  }

  getActivityDetail(place_id) {
    var url = 'https://maps.googleapis.com/maps/api/place/details/json?';
    var key = 'key=AIzaSyBvQmk94aTqb-lS9TZcYK0XPE_Vj93i6CQ';
    var param = '&placeid='
    this.http.get(url + key + param + place_id)
      .subscribe(
        (response: Response) => {
          this.activityDetailData = response.json().result;
          this.activityDetailFetched.next(this.activityDetailData);
        });
  }

  //SENDS ACTIVITY DATA
  fetchActivityData() {
    return this.activityData;
  }
}
