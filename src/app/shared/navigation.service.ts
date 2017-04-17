import { Subject } from 'rxjs/Subject';

export class NavigationService {
  whichExpandedView = new Subject<string>();

  enterExpandedView(string){
    this.whichExpandedView.next(string);
  }

  exitExpandedView() {
    this.whichExpandedView.next('');
  }
}
