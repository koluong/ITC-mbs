import { Component, OnInit } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Router } from '@angular/router';

import { NavigationService } from '../shared/navigation.service';

@Component({
  selector: 'app-properties',
  templateUrl: './properties.component.html',
  styleUrls: ['./properties.component.css']
})
export class PropertiesComponent implements OnInit {
  inExpandedView: string;

  constructor(private http: Http,
              private router: Router,
              private navService: NavigationService) { }

  ngOnInit() {
    this.getHouseData();
  }
  onExpand() {
    this.router.navigate(['/restaurants']);
    this.navService.enterExpandedView('restaurants');
  }

  getHouseData() {
    let url = 'http://www.zillow.com/webservice/GetSearchResults.htm?';
    let key = 'zws-id=X1-ZWz1fris19zrwr_9r65p';
    let address = '&address=';
    let citystatezip = '&citystatezip=';

    this.http.get('http://www.zillow.com/webservice/GetUpdatedPropertyDetails.htm?zws-id=X1-ZWz1fris19zrwr_9r65p&zpid=21665528')
      .subscribe(
        (response: Response) => {
          // console.log(response.text() + 'HELLO')
        })
  }
}
