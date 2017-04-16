import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NavigationService } from '../../shared/navigation.service';

@Component({
  selector: 'app-weather-expand',
  templateUrl: './weather-expand.component.html',
  styleUrls: ['./weather-expand.component.css']
})
export class WeatherExpandComponent implements OnInit {

  constructor(private route: ActivatedRoute,
              private router: Router,
              private navService: NavigationService) { }

  ngOnInit() {

  }

  onClose() {
    this.router.navigate(['..'], {relativeTo: this.route});
    this.navService.exitExpandedView();
  }

}
