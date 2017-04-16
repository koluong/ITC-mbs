import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { NavigationService } from '../shared/navigation.service';

@Component({
  selector: 'app-weather-preview',
  templateUrl: 'weather-preview.component.html',
  styleUrls: ['weather-preview.component.css']
})

export class WeatherPreviewComponent implements OnInit, OnDestroy {
  inExpandedView = false;
  subscription: Subscription;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private navService: NavigationService) {}

  ngOnInit() {
    this.subscription = this.navService.inExpandedView
      .subscribe(
        (exView: boolean) => this.inExpandedView = exView
      );
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  onExpand() {
    this.router.navigate(['/weather']);
    this.navService.enterExpandedView();
  }
}
