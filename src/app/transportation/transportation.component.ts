import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Response } from '@angular/http';
import { Subscription } from 'rxjs';

import { NavigationService } from '../shared/navigation.service';
import { DistanceService } from '../shared/distance.service';
import { TransportationService } from './transportation.service';

@Component({
  selector: 'app-transportation',
  templateUrl: './transportation.component.html',
  styleUrls: ['./transportation.component.css']
})
export class TransportationComponent implements OnInit, OnDestroy {
  photoCall = 'https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyBvQmk94aTqb-lS9TZcYK0XPE_Vj93i6CQ&maxheight=150&photo_reference=';

  inExpandedView: string;
  busData = [];
  trainData = [];
  airportData = [];
  airSingleDist: string;
  busSingleDist: string;
  trainSingleDist: string;
  airportDistanceData = [];
  busDistancecData = [];
  trainDistanceData = [];


  navSub: Subscription;
  searchSub: Subscription;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private navService: NavigationService,
              private transService: TransportationService,
              private distService: DistanceService) { }

  ngOnInit() {
    this.navSub = this.navService.whichExpandedView
      .subscribe(
        (view: string) => this.inExpandedView = view
      );
    this.searchSub = this.transService.coordsFetched
      .subscribe(
        (data) => {
          data = '';
          this.loadBusData();
          this.loadTrainData();

        },
        err => console.log(err)
      );
      this.searchSub = this.transService.locationFetched
        .subscribe(
          (data) => {
            data = '';
            this.loadAirportData();

          },
          err => console.log(err)
        );

    this.loadBusData();
    this.loadTrainData();
    this.loadAirportData();
  }
  ngOnDestroy() {
    this.navSub.unsubscribe();
    this.searchSub.unsubscribe();
  }
  //FUNCTIONS
  onExpand() {
    this.router.navigate(['/transportation']);
    this.navService.enterExpandedView('transportation');
  }

  loadBusData() {
    let coords = [];
    this.transService.busStationSearch()
      .subscribe(
        (data) => {
          this.busData = data[0];
          for (let i = 0; i < data.length; i++) {
            if(i != data.length - 1){
              coords.push(data[i]['geometry'].location.lat+',');
              coords.push(data[i]['geometry'].location.lng+'|');
            } else {
              coords.push(data[i]['geometry'].location.lat+',');
              coords.push(data[i]['geometry'].location.lng);
            }
          }
          this.distService.calculateDistance(coords)
            .subscribe(
              (data) => {
                this.busDistancecData = data;
                this.busSingleDist = data[0].distance.text;
                this.transService.storeDistanceBus(data);
              }
            );
        },
          err => { console.log(err);
        });
  }
  loadTrainData() {
    let coords = [];
    this.transService.trainStationSearch()
      .subscribe(
        (data) => {
          this.trainData = data[0];
          for (let i = 0; i < data.length; i++) {
            if(i != data.length - 1){
              coords.push(data[i]['geometry'].location.lat+',');
              coords.push(data[i]['geometry'].location.lng+'|');
            } else {
              coords.push(data[i]['geometry'].location.lat+',');
              coords.push(data[i]['geometry'].location.lng);
            }
          }
          this.distService.calculateDistance(coords)
            .subscribe(
              (data) => {
                this.trainDistanceData = data;
                this.trainSingleDist = data[0].distance.text;
                this.transService.storeDistanceTrain(data);
              }
            );
        },
          err => { console.log(err);
        });
  }

  loadAirportData() {
    let coords = [];
    this.transService.airportSearch()
      .subscribe(
        (data) => {
          this.airportData = data[0];
          for (let i = 0; i < data.length; i++) {
            if(i != data.length - 1){
              coords.push(data[i]['geometry'].location.lat+',');
              coords.push(data[i]['geometry'].location.lng+'|');
            } else {
              coords.push(data[i]['geometry'].location.lat+',');
              coords.push(data[i]['geometry'].location.lng);
            }
          }
          this.distService.calculateDistance(coords)
            .subscribe(
              (data) => {this.airportDistanceData = data;
              this.airSingleDist = data[0].distance.text;
              this.transService.storeDistanceAirport(data);
            }
            );
        },
          err => { console.log(err);
        });
  }

  getRatingClass(rating) {
    if(rating == 5){
      return 'stars-100'
    } else if ( rating >= 4.5 ) {
      return 'stars-90'
    } else if ( rating >= 4.0 ) {
      return 'stars-80'
    } else if ( rating >= 3.5 ) {
      return 'stars-70'
    } else if ( rating >= 3 ) {
      return 'stars-60'
    } else if ( rating >= 2.5 ) {
      return 'stars-50'
    } else if ( rating >= 2 ) {
      return 'stars-40'
    } else if ( rating >= 1.5 ) {
      return 'stars-30'
    } else if ( rating >= 1 ) {
      return 'stars-20'
    } else {
      return 'stars-10'
    }
  }
}
