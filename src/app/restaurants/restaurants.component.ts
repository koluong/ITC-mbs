import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Response } from '@angular/http';
import { Subscription } from 'rxjs';

import { NavigationService } from '../shared/navigation.service';

@Component({
  selector: 'app-restaurants',
  templateUrl: './restaurants.component.html',
  styleUrls: ['./restaurants.component.css']
})
export class RestaurantsComponent implements OnInit, OnDestroy {
  inExpandedView: string;
  subscription: Subscription;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private navService: NavigationService) { }

  ngOnInit() {
    this.subscription = this.navService.whichExpandedView
      .subscribe(
        (view: string) => this.inExpandedView = view
      );
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  onExpand() {
    this.router.navigate(['/restaurants']);
    this.navService.enterExpandedView('restaurants');
  }

}
