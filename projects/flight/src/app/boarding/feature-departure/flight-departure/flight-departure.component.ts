import { AsyncPipe, DatePipe, NgIf } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { Observable, catchError, debounceTime, delay, distinctUntilChanged, filter, of, switchMap, tap } from 'rxjs';
import { Flight, FlightService } from '../../../booking/api-boarding';

@Component({
  selector: 'app-flight-departure',
  standalone: true,
  imports: [
    // CommonModule,
    AsyncPipe, NgIf, DatePipe,
    ReactiveFormsModule
  ],
  templateUrl: './flight-departure.component.html',
  styleUrl: './flight-departure.component.scss'
})
export class FlightDepartureComponent {
  private flightService = inject(FlightService);

  control = new FormControl('', { nonNullable: true });
  flights$ = this.initFlightsStream();
  loading = false;

  private initFlightsStream(): Observable<Flight[]> {
    /**
     * Stream 1: Value of Input field -> string, City name
     *  - Trigger
     *  - Data / State Provider
     */
    return this.control.valueChanges.pipe(
      // Filtering START
      filter(city => city.length > 2),
      debounceTime(300),
      distinctUntilChanged(),
      // Side-Effect: loading state
      tap(() => this.loading = true),
      // Filtering END
      /**
       * Stream 2: Http call to Backend API -> Flights, Flight Array
       *  - Data / State Provider
       */
      switchMap(city => this.load(city).pipe(
        catchError(() => of([]))
      )),
      // Delay for demo purpose
      // delay(5_000),
      // Side-Effect: loading state
      tap(() => this.loading = false),
    );
  }

  load(city: string): Observable<Flight[]> {
    return this.flightService.find(city, '');
  }
}
