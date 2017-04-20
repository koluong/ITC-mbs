import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs/Subject';

import { NavigationService } from '../../shared/navigation.service';
import { ActivitiesService } from '../activities.service';

@Component({
  selector: 'app-activities-expand',
  templateUrl: './activities-expand.component.html',
  styleUrls: ['./activities-expand.component.css']
})
export class ActivitiesExpandComponent implements OnInit {
  photoCall = 'https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyBvQmk94aTqb-lS9TZcYK0XPE_Vj93i6CQ&maxheight=150&photo_reference=';
  activityData = [];

  constructor(private route: ActivatedRoute,
              private router: Router,
              private navService: NavigationService,
              private actService: ActivitiesService) {}
  ngOnInit() {
    this.fetchData();
  }

  onClose() {
    this.router.navigate(['..'], {relativeTo: this.route});
    this.navService.exitExpandedView();
  }
  onDetailOpen(place_id) {
    this.actService.getActivityDetail(place_id);
    this.router.navigate(['detail'], {relativeTo: this.route});
  }

  fetchData() {
    this.activityData = this.actService.fetchActivityData();
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
