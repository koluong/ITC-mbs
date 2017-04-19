import { Subject } from 'rxjs/Subject';

export class NavigationService {
  whichExpandedView = new Subject<string>();
  coordsChanged = new Subject<number[]>();
  locationChanged = new Subject<string>();

  coords = [];
  location: string;

  enterExpandedView(string){
    this.whichExpandedView.next(string);
  }

  exitExpandedView() {
    this.whichExpandedView.next('');
  }

  setNewCoordinates(latitude: number, longitude: number) {
    this.coords = [];
    this.coords.push(latitude);
    this.coords.push(longitude);
    this.coordsChanged.next(this.coords.slice());
  }

  setNewLocation(place) {
    var tempArray = [];
    this.location = '';
    tempArray.push(place.address_components[3].long_name);
    tempArray.push(place.address_components[5].long_name);
    // tempArray.push(place.address_components[6].long_name);
    this.location = tempArray.join(' ');
    this.locationChanged.next(this.location);
  }
}
