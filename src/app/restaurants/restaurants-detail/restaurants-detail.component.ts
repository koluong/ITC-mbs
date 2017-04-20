import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { NavigationService } from '../../shared/navigation.service';
import { RestaurantsService } from '../restaurants.service';

@Component({
  selector: 'app-restaurants-detail',
  templateUrl: './restaurants-detail.component.html',
  styleUrls: ['./restaurants-detail.component.css']
})
export class RestaurantsDetailComponent implements OnInit {
  photoCall = 'https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyBvQmk94aTqb-lS9TZcYK0XPE_Vj93i6CQ&maxheight=300&photo_reference=';
  photo_reference: string;
  open_now: boolean;
  weekday_text: string[];
  detailData = {};

  constructor(private router: Router,
              private route: ActivatedRoute,
              private navService: NavigationService,
              private restaurantsService: RestaurantsService) { }

  ngOnInit() {
    this.loadDetailData();
  }

  onClose() {
    this.router.navigate(['..'], {relativeTo: this.route});
    this.navService.exitExpandedView();
  }
  loadDetailData() {
    this.restaurantsService.detailDataFetched
      .subscribe(
        (data) => {
          this.detailData = data;
          this.open_now = data['opening_hours'].open_now;
          this.weekday_text = data['opening_hours'].weekday_text;
          this.photo_reference = data['photos'][1].photo_reference;
        },
          err => { console.log(err);
        });
  }
}
