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
  hourlyTemps = [];
  hourlyHours = [];

  constructor(private route: ActivatedRoute,
              private router: Router,
              private navService: NavigationService,
              private weatherService: WeatherService) { }

  ngOnInit() {
    this.weatherData = this.weatherService.fetchWeatherData();
  }

  onClose() {
    this.router.navigate(['..'], {relativeTo: this.route});
    this.navService.exitExpandedView();
  }

}
