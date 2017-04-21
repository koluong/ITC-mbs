import { Injectable, OnDestroy } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { Subject } from 'rxjs/Subject';
import 'rxjs/Rx';

import { NavigationService } from '../shared/navigation.service';

@Injectable()
export class TransportationService {
  coordsFetched = new Subject<any>();
  locationFetched = new Subject<any>();
  subscription: Subscription;


  location: string = "Pomona CA";
  latitude: number = 34.059144;
  longitude: number = -117.820072;
  busData = [];
  trainData = [];
  airportData = [];
  airportDistanceData = [];
  busDistancecData = [];
  trainDistanceData = [];


  constructor(private http: Http,
              private navService: NavigationService) {
                this.setCoordsSubscription();
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  setCoordsSubscription() {
    this.subscription = this.navService.coordsChanged
      .subscribe(
        (data = []) => {
          this.latitude = data[0];
          this.longitude = data[1];
          this.coordsFetched.next('transport data');
        });

    this.subscription = this.navService.locationChanged
      .subscribe((location) => {
        this.location = location;
        this.locationFetched.next('act data fetched');
    });
  }

  busStationSearch() {
    var url = 'https://crossorigin.me/https://maps.googleapis.com/maps/api/place/nearbysearch/json?';
    var key = '&key=AIzaSyBvQmk94aTqb-lS9TZcYK0XPE_Vj93i6CQ'
    var params = 'type=bus_station&rankby=distance&location='
          + this.latitude + ',' + this.longitude;

    return this.http.get(url + params + key)
      .map(
        (response: Response) => {
          if (response.json()['results'].length >= 5) {
            this.busData = response.json()['results'].splice(0, 5);
          } else {
            this.busData = response.json()['results'];
          }
          return this.busData;
        })
        .catch((error) => Observable.throw(error.json().error));
  }

  trainStationSearch() {
    var url = 'https://crossorigin.me/https://maps.googleapis.com/maps/api/place/nearbysearch/json?';
    var key = '&key=AIzaSyBvQmk94aTqb-lS9TZcYK0XPE_Vj93i6CQ'
    var params = 'type=train_station&rankby=distance&location='
          + this.latitude + ',' + this.longitude;

    return this.http.get(url + params + key)
      .map(
        (response: Response) => {
          if (response.json()['results'].length >= 5) {
            this.trainData = response.json()['results'].splice(0, 5);
          } else {
            this.trainData = response.json()['results'];
          }
          return this.trainData;
        })
        .catch((error) => Observable.throw(error.json().error));
  }

  airportSearch() {
    var url = 'https://crossorigin.me/https://maps.googleapis.com/maps/api/place/textsearch/json?';
    var key = '&language=en&key=AIzaSyBvQmk94aTqb-lS9TZcYK0XPE_Vj93i6CQ'
    var params = '&query=international+airports+' + this.location;

    return this.http.get(url + params + key)
      .map(
        (response: Response) => {
          if (response.json()['results'].length >= 5) {
            this.airportData = response.json()['results'].splice(0, 5);
          } else {
            this.airportData = response.json()['results'];
          }
          return this.airportData;
        })
        .catch((error) => Observable.throw(error.json().error));
  }
  storeDistanceBus(data) {
    this.busDistancecData = data;
  }
  storeDistanceTrain(data) {
    this.trainDistanceData = data;
  }
  storeDistanceAirport(data) {
    this.airportDistanceData = data;
  }

  fetchBusData() {
    return this.busData;
  }
  fetchTrainData() {
    return this.trainData;
  }
  fetchAirportData() {
    return this.airportData;
  }
  fetchBusDistance() {
    return this.airportDistanceData;
  }
  fetchTrainDistance() {
    return this.busDistancecData;
  }
  fetchAirportDistance() {
    return this.airportDistanceData;
  }
}
