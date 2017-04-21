import { Component, OnInit, OnDestroy } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

import { NavigationService } from '../shared/navigation.service';
import { PropertiesService } from './properties.service';

@Component({
  selector: 'app-properties',
  templateUrl: './properties.component.html',
  styleUrls: ['./properties.component.css']
})
export class PropertiesComponent implements OnInit, OnDestroy {
  sub: Subscription;
  locSub: Subscription;
  inExpandedView: string;
  zpid: string;
  propertyData = [];

  constructor(private http: Http,
              private router: Router,
              private navService: NavigationService,
              private propService: PropertiesService) { }

  ngOnInit() {
    this.sub = this.propService.newZpid
      .subscribe(
        (data) => {
         data='';
         this.loadDetailData();
      },
      err => console.log(err)
    );

    this.locSub = this.propService.newLoc
      .subscribe(
        (data) =>{
         data = '';
         this.propertyData = [];
         this.propService.newZip
          .subscribe(
            (data) => {
              data = '';
              this.loadPropertyData();
            }
          );
      },
       err => console.log(err)
     );


    this.loadPropertyData();
  }
  ngOnDestroy() {
    this.sub.unsubscribe();
    this.locSub.unsubscribe();
  }
  onExpand() {
    this.router.navigate(['/properties']);
    this.navService.enterExpandedView('properties');
  }

  loadPropertyData() {
    this.propService.getSearchData()
      .subscribe(
        (data) => {
          this.zpid = data;
      }, err => console.log(err)
    )
  }

  loadDetailData() {
    this.propService.getDetailData()
      .subscribe(
        (data) => {
          this.propertyData = data;
      }, err => console.log(err))
  }
}
