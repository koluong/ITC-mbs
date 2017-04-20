import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { Subscription } from 'rxjs';
import 'rxjs/Rx';

import { NavigationService } from '../shared/navigation.service';

@Injectable()
export class AboutService {
  private URL = 'https://en.wikipedia.org/w/api.php?';
  private QUERY = 'action=query&format=json&prop=extracts&meta=&titles=&generator=search&exsentences=2&exintro=1&gsrlimit=1&explaintext=1&gsrsearch=';
  locationFetched = new Subject<any>();

  location: string = "Pomona CA";
  locationData: {};

  constructor(private http: Http,
              private navService: NavigationService){
              this.setLocationSubscription();
  }

  retrieveAboutData(): Observable<any> {
    return this.http.get(this.URL + this.QUERY + this.location)
              .map(
                (response: Response) => {
                  this.locationData = response.json();
                  return this.locationData;
                })
                .catch((error) => Observable.throw(error.json().error));

  }

  setLocationSubscription() {
    this.navService.locationChanged
      .subscribe(
        (location: string) => {
          this.location = location;
          this.locationFetched.next('new location inc');
        }
      )
  }


}
