import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NavigationService } from '../../shared/navigation.service';
import { WeatherService } from '../weather.service';

@Component({
  selector: 'app-weather-expand',
  templateUrl: './weather-expand.component.html',
  styleUrls: ['./weather-expand.component.css']
})
export class WeatherExpandComponent implements OnInit {
  iconSource = "../../assets/weather-icons/";
  weatherData: {};
  weeklyData: {};
  hourlyData = [];

  constructor(private route: ActivatedRoute,
              private router: Router,
              private navService: NavigationService,
              private weatherService: WeatherService) { }

  ngOnInit() {
    this.weatherData = this.weatherService.fetchWeatherData();
    this.weeklyData = this.weatherService.fetchWeatherData()['daily'].data.slice(1, 6);
    this.hourlyData = this.weatherService.fetchWeatherData()['hourly'].data.slice(0, 10);
  }

  onClose() {
    this.router.navigate(['/']);
    this.navService.exitExpandedView();
  }

}
