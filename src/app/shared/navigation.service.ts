import { Subject } from 'rxjs/Subject';

export class NavigationService {
  whichExpandedView = new Subject<string>();
  coordsChanged = new Subject<number[]>();

  coords = [];

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
}
