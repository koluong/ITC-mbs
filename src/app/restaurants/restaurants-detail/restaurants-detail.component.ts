import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { NavigationService } from '../../shared/navigation.service';

@Component({
  selector: 'app-restaurants-detail',
  templateUrl: './restaurants-detail.component.html',
  styleUrls: ['./restaurants-detail.component.css']
})
export class RestaurantsDetailComponent implements OnInit {
  photoCall = 'https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyBvQmk94aTqb-lS9TZcYK0XPE_Vj93i6CQ&maxwidth=200&photo_reference=';

  constructor(private router: Router,
              private route: ActivatedRoute,
              private navService: NavigationService) { }

  ngOnInit() {
  }

  onClose() {
    this.router.navigate(['..'], {relativeTo: this.route});
    this.navService.exitExpandedView();
  }

}
