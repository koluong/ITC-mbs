import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Response } from '@angular/http';
import { Subscription } from 'rxjs';

import { NavigationService } from '../shared/navigation.service';
import { WeatherService } from './weather.service';

@Component({
  selector: 'app-weather-preview',
  templateUrl: 'weather-preview.component.html',
  styleUrls: ['weather-preview.component.css']
})

export class WeatherPreviewComponent implements OnInit, OnDestroy {
  inExpandedView = false;
  subscription: Subscription;
  weatherSubscription: Subscription;
  dailyData: {};
  conditionData: string;
  tempData: number;

  iconSource = "../../assets/weather-icons/";

  constructor(private route: ActivatedRoute,
              private router: Router,
              private navService: NavigationService,
              private weatherService: WeatherService) {}

  ngOnInit() {
    this.subscription = this.navService.inExpandedView
      .subscribe(
        (exView: boolean) => this.inExpandedView = exView
      );

    this.loadWeatherData();
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
    this.weatherSubscription.unsubscribe();
  }
  onExpand() {
    this.router.navigate(['/weather']);
    this.navService.enterExpandedView();
  }

  loadWeatherData() {
    this.weatherSubscription = this.weatherService.retrieveWeatherData()
      .subscribe(
        (data: {}) => {
          this.dailyData = data['daily'].data.slice(0, 3);
        },
          err => { console.log(err);
        });
  }
}
