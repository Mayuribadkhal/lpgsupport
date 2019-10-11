import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { PlatformLocation } from '@angular/common';

import * as fromCalendar from "@app/core/store/calendar";

@Component({
  selector: 'sa-analytics',
  templateUrl: './analytics.component.html',
})
export class AnalyticsComponent implements OnInit {
  

  public calendar$
  constructor(
    private store: Store<any>,
    private location: PlatformLocation
  ) {
    this.calendar$ = this.store.select(fromCalendar.getCalendarState);
  }

  ngOnInit() {
    // For back disable
    history.pushState(null, null, location.href);
    this.location.onPopState(() => {   console.log('pressed back in add!!!!!');
   // AppModule.router.navigate(['dashboard/analytics']);
    history.forward();
    });
  }

}
