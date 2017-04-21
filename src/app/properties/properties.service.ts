import { Injectable, OnDestroy } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { Subject } from 'rxjs/Subject';
import 'rxjs/Rx';

import { NavigationService } from '../shared/navigation.service';

@Injectable()
export class PropertiesService implements OnDestroy {
  newZpid = new Subject<string>();
  newLoc = new Subject<string>();
  newZip = new Subject<string>();

  addressSub: Subscription;
  zipSub: Subscription;

  zpid: string;
  address: string = '23907 Sapphire Canyon';
  cityStateZip: string = 'Diamond Bar CA 91765';

  propertyData = [];

  constructor(private http: Http,
              private navService: NavigationService) {
                this.setAddressSubscription();
                this.setZipSubscription();
              }
  ngOnDestroy() {
    this.addressSub.unsubscribe();
    this.zipSub.unsubscribe();
  }

  getSearchData() {
    let url = 'http://www.zillow.com/webservice/GetDeepSearchResults.htm?';
    let key = 'zws-id=X1-ZWz1fris19zrwr_9r65p';
    let address = '&address=' + this.address;
    let citystatezip = '&citystatezip=' + this.cityStateZip;

    let parser = new DOMParser();

    return this.http.get(url + key + address + citystatezip )
      .map(
        (response: any) => {
          let doc = parser.parseFromString(response.text(), "application/xml");
          this.zpid = doc.getElementsByTagName('zpid')[0].childNodes[0].nodeValue;
          this.newZpid.next('new zpid');
          return this.zpid;
        })
  }

  getDetailData() {
    let parser = new DOMParser();

    let url = 'http://www.zillow.com/webservice/GetUpdatedPropertyDetails.htm?';
    let key = 'zws-id=X1-ZWz1fris19zrwr_9r65p';
    let zpid = '&zpid=' + this.zpid;


    return this.http.get(url + key + zpid)
      .map(
        (response: any) => {
          let doc = parser.parseFromString(response.text(), "application/xml");
          this.propertyData = [];
          console.log(doc.getElementsByTagName('code')[0].childNodes[0].nodeValue);
          if (doc.getElementsByTagName('code')[0].childNodes[0].nodeValue != "502"){
            this.propertyData.push({
              street: doc.getElementsByTagName('street')[0].childNodes[0].nodeValue,
              zipcode: doc.getElementsByTagName('zipcode')[0].childNodes[0].nodeValue,
              city: doc.getElementsByTagName('city')[0].childNodes[0].nodeValue,
              state: doc.getElementsByTagName('state')[0].childNodes[0].nodeValue,
              image: doc.getElementsByTagName('url')[0].childNodes[0].nodeValue,
              useCode: doc.getElementsByTagName('useCode')[0].childNodes[0].nodeValue,
              bedrooms: doc.getElementsByTagName('bedrooms')[0].childNodes[0].nodeValue,
              bathrooms: doc.getElementsByTagName('bathrooms')[0].childNodes[0].nodeValue,
              finishedSqFt: doc.getElementsByTagName('finishedSqFt')[0].childNodes[0].nodeValue,
              lotSizeSqFt: doc.getElementsByTagName('lotSizeSqFt')[0].childNodes[0].nodeValue,
              yearBuilt: doc.getElementsByTagName('yearBuilt')[0].childNodes[0].nodeValue,
              numRooms: doc.getElementsByTagName('numRooms')[0].childNodes[0].nodeValue,
              architecture: doc.getElementsByTagName('architecture')[0].childNodes[0].nodeValue,
              description: doc.getElementsByTagName('homeDescription')[0].childNodes[0].nodeValue,
            })
          };
          return this.propertyData;
        })
  }

  setAddressSubscription() {
    this.addressSub = this.navService.propertyAddrChanged
      .subscribe(
        (data) => {
          this.address = data;
          this.newLoc.next('new loc');
        }
      );
  }
  setZipSubscription() {
    this.zipSub = this.navService.propertyZipChanged
      .subscribe(
        (data) => {
          this.cityStateZip = data;
        this.newZip.next('new zip');
      }
      );
  }

  fetchData() {
    return this.propertyData;
  }
}
