import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Response } from '@angular/http';
import { Subscription } from 'rxjs';

import { NavigationService } from '../shared/navigation.service';

@Component({
  selector: 'app-schools',
  templateUrl: './schools.component.html',
  styleUrls: ['./schools.component.css']
})
export class SchoolsComponent implements OnInit, OnDestroy {
  inExpandedView: string;
  subscription: Subscription;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private navService: NavigationService) { }

  ngOnInit() {
    this.subscription = this.navService.whichExpandedView
      .subscribe(
        (view: string) => this.inExpandedView = view
      );
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  onExpand() {
    this.router.navigate(['/schools']);
    this.navService.enterExpandedView('schools');
  }

}
