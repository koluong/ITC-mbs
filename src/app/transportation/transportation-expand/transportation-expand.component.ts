import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs/Subject';

import { NavigationService } from '../../shared/navigation.service'
import { TransportationService } from '../transportation.service';

@Component({
  selector: 'app-transportation-expand',
  templateUrl: './transportation-expand.component.html',
  styleUrls: ['./transportation-expand.component.css']
})
export class TransportationExpandComponent implements OnInit {
  photoCall = 'https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyBvQmk94aTqb-lS9TZcYK0XPE_Vj93i6CQ&maxheight=150&photo_reference=';

  busData = [];
  trainData = [];
  airportData = [];
  busDistanceData = [];
  trainDistanceData = [];
  airportDistanceData = [];

  constructor(private route: ActivatedRoute,
              private router: Router,
              private navService: NavigationService,
              private transService: TransportationService) { }

  ngOnInit() {
    this.fetchData();
  }
  onClose() {
    this.router.navigate(['..'], {relativeTo: this.route});
    this.navService.exitExpandedView();
  }
  sendCoordinates(lat, lng) {
    this.navService.setMarkerCoordinates(lat, lng);
  }

  fetchData() {
    this.busData = this.transService.fetchBusData();
    this.trainData = this.transService.fetchTrainData();
    this.airportData = this.transService.fetchAirportData();
    this.busDistanceData = this.transService.fetchBusDistance();
    this.trainDistanceData = this.transService.fetchTrainDistance();
    this.airportDistanceData = this.transService.fetchAirportDistance();
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
    } else if ( rating > 0) {
      return 'stars-10'
    } else {
      return 'stars-0'
    }
  }
}
