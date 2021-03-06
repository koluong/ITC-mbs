import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Response } from '@angular/http';
import { Subscription } from 'rxjs';

import { NavigationService } from '../shared/navigation.service';
import { RestaurantsService } from './restaurants.service';

@Component({
  selector: 'app-restaurants',
  templateUrl: './restaurants.component.html',
  styleUrls: ['./restaurants.component.css']
})
export class RestaurantsComponent implements OnInit, OnDestroy {
  //CONSTANTS
  photoCall = 'https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyBvQmk94aTqb-lS9TZcYK0XPE_Vj93i6CQ&maxheight=150&photo_reference=';

  //DATA
  inExpandedView: string;
  searchData: {};

  //SUBSCRIPTIONS
  navSub: Subscription;
  searchSub: Subscription;

  //INITIALIZATIONS
  constructor(private route: ActivatedRoute,
              private router: Router,
              private navService: NavigationService,
              private restaurantsService: RestaurantsService) { }
  ngOnInit() {
    this.navSub = this.navService.whichExpandedView
      .subscribe(
        (view: string) => this.inExpandedView = view
      );
    this.searchSub = this.restaurantsService.searchDataFetched
      .subscribe(
        (data) => {
          data = '';
          this.loadRestaurantData();
        },
        err => console.log(err)
      );
    this.loadRestaurantData();
  }
  ngOnDestroy() {
    this.navSub.unsubscribe();
    this.searchSub.unsubscribe();
  }
  //FUNCTIONS
  onExpand() {
    this.router.navigate(['/restaurants']);
    this.navService.enterExpandedView('restaurants');
  }

  loadRestaurantData() {
    this.restaurantsService.restaurantsSearch()
      .subscribe(
        (data) => {
          this.searchData = data.slice(0, 2);
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
