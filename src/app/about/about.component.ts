import { Component, OnInit } from '@angular/core';
import { Response } from '@angular/http';
import { Subscription } from 'rxjs';

import { NavigationService } from '../shared/navigation.service';
import { AboutService } from './about.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {
  pageURL = "https://en.wikipedia.org/?curid=";
  locChangeSub: Subscription;
  locDataSub: Subscription;
  description: string;

  constructor(private navService: NavigationService,
              private aboutService: AboutService) { }

  ngOnInit() {
    this.locChangeSub = this.aboutService.locationFetched
      .subscribe(
        (data) => {
          data = '';
          this.loadLocationData();
        }
      );

    this.loadLocationData();
  }
  ngOnDestroy() {
    this.locDataSub.unsubscribe();
    this.locChangeSub.unsubscribe();
  }

  loadLocationData() {
    this.locDataSub = this.aboutService.retrieveAboutData()
      .subscribe(
        (data: {}) => {
          var pages = data['query'].pages;
          var keys = Object.keys(pages);
          var id = keys[0];
          this.description = pages[id].extract;
          // NEED TO FIX WIKI CALLS
        },
          (err) => { console.log(err)});
  }

}
