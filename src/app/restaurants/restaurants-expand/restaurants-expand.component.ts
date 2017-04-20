import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs/Subject';

import { NavigationService } from '../../shared/navigation.service';
import { RestaurantsService } from '../restaurants.service';

@Component({
  selector: 'app-restaurants-expand',
  templateUrl: './restaurants-expand.component.html',
  styleUrls: ['./restaurants-expand.component.css']
})
export class RestaurantsExpandComponent implements OnInit {
  photoCall = 'https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyBvQmk94aTqb-lS9TZcYK0XPE_Vj93i6CQ&maxheight=150&photo_reference=';
  restaurantData = [];

  constructor(private route: ActivatedRoute,
              private router: Router,
              private navService: NavigationService,
              private restaurantsService: RestaurantsService) { }

  ngOnInit() {
    this.fetchData();
  }

  onClose() {
    this.router.navigate(['..'], {relativeTo: this.route});
    this.navService.exitExpandedView();
  }
  onDetailOpen(place_id) {
    this.restaurantsService.restaurantDetailGet(place_id);
    this.router.navigate(['detail'], {relativeTo: this.route});
  }

  fetchData() {
    this.restaurantData = this.restaurantsService.fetchRestaurantData();
  }
}
