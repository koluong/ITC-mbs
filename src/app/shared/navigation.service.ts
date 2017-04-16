import { Subject } from 'rxjs/Subject';

export class NavigationService {
  inExpandedView = new Subject<boolean>();

  enterExpandedView(){
    this.inExpandedView.next(true);
  }

  exitExpandedView() {
    this.inExpandedView.next(false);
  }
}
