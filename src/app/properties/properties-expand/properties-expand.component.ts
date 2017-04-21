import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NavigationService } from '../../shared/navigation.service';
import { PropertiesService } from '../properties.service';

@Component({
  selector: 'app-properties-expand',
  templateUrl: './properties-expand.component.html',
  styleUrls: ['./properties-expand.component.css']
})
export class PropertiesExpandComponent implements OnInit {
  propertyData = [];

  constructor(private route: ActivatedRoute,
              private router: Router,
              private navService: NavigationService,
              private propsService: PropertiesService) { }

  ngOnInit() {
    this.propertyData = this.propsService.fetchData();
  }

  onClose() {
    this.router.navigate(['/']);
    this.navService.exitExpandedView();
  }

}
