import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

import { NavigationService } from '../../shared/navigation.service';
import { ActivitiesService } from '../activities.service';

@Component({
  selector: 'app-activities-detail',
  templateUrl: './activities-detail.component.html',
  styleUrls: ['./activities-detail.component.css']
})
export class ActivitiesDetailComponent implements OnInit, OnDestroy {
  subscription: Subscription;
  photoCall = 'https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyBvQmk94aTqb-lS9TZcYK0XPE_Vj93i6CQ&maxheight=300&photo_reference=';
  photo_reference: string;
  open_now: boolean;
  weekday_text: string[];
  detailData = {};

  constructor(private route: ActivatedRoute,
              private router: Router,
              private navService: NavigationService,
              private actService: ActivitiesService) { }

  ngOnInit() {
    this.loadDetailData();
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  onClose() {
    this.router.navigate(['..'], {relativeTo: this.route});
    this.navService.exitExpandedView();
  }

  loadDetailData() {
    this.subscription = this.actService.activityDetailFetched
      .subscribe(
        (data) => {
          this.detailData = data;
          if(data['opening_hours']) {
            if(data['opening_hours'].open_now)
              this.open_now = data['opening_hours'].open_now;
            if(data['opening_hours'].weekday_text)
              this.weekday_text = data['opening_hours'].weekday_text;
          }

          if(data['photos'][1].photo_reference) {
            this.photo_reference = data['photos'][1].photo_reference;
          } else {
          this.photo_reference = data['photos'][0].photo_reference;
        }
        },
        err => console.log(err)
      );
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
