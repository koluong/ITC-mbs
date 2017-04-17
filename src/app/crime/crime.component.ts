import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Response } from '@angular/http';
import { Subscription } from 'rxjs';

import { NavigationService } from '../shared/navigation.service';

@Component({
  selector: 'app-crime',
  templateUrl: './crime.component.html',
  styleUrls: ['./crime.component.css']
})
export class CrimeComponent implements OnInit {
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
    this.router.navigate(['/crime']);
    this.navService.enterExpandedView('crime');
  }
}
