import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Response } from '@angular/http';
import { Subscription } from 'rxjs';

import { NavigationService } from '../shared/navigation.service';
import { ActivitiesService } from './activities.service';

@Component({
  selector: 'app-activities',
  templateUrl: './activities.component.html',
  styleUrls: ['./activities.component.css']
})
export class ActivitiesComponent implements OnInit, OnDestroy {
  photoCall = 'https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyBvQmk94aTqb-lS9TZcYK0XPE_Vj93i6CQ&maxheight=150&photo_reference=';

  navSub: Subscription;
  activityData = [];
  inExpandedView: string;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private navService: NavigationService,
              private actService: ActivitiesService) { }

  ngOnInit() {
    this.navSub = this.navService.whichExpandedView
      .subscribe((view: string) => this.inExpandedView = view);

    this.actService.activityDataFetched
      .subscribe((data) => {
        data='';
        this.loadActivityData();
      }, err => console.log(err));

    this.loadActivityData();
  }
  ngOnDestroy() {
    this.navSub.unsubscribe();
  }
  onExpand() {
    this.router.navigate(['/activities']);
    this.navService.enterExpandedView('activities');
  }

  loadActivityData() {
    this.actService.getActivityData()
      .subscribe(
        (data) => {
          if (data.length >= 2) {
            this.activityData = data.slice(0, 2);
          } else {
            this.activityData = data;
          }
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
