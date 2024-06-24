import { AsyncPipe, CommonModule, NgIf } from '@angular/common';
import { Component, OnDestroy } from '@angular/core';
import { Subscription, share, tap, timer } from 'rxjs';

@Component({
  selector: 'app-flight-departure',
  standalone: true,
  imports: [
    // CommonModule,
    AsyncPipe, NgIf
  ],
  templateUrl: './flight-departure.component.html',
  styleUrl: './flight-departure.component.scss'
})
export class FlightDepartureComponent implements OnDestroy {
  timer$ = timer(0, 2_000).pipe(
    tap(value => console.log('Producing value', value)),
    share()
  );
  subscription = new Subscription();

  constructor() {
    this.subscription.add(
      this.timer$.subscribe(console.log)
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
