import { CommonModule } from '@angular/common';
import { Component, computed, effect, inject, signal, untracked } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FlightService } from '../../api-boarding';
import { Flight, FlightFilter } from '../../logic-flight';
import { FlightCardComponent, FlightFilterComponent } from '../../ui-flight';


@Component({
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    FlightCardComponent,
    FlightFilterComponent
  ],
  selector: 'app-flight-search',
  templateUrl: './flight-search.component.html',
})
export class FlightSearchComponent {
  private flightService = inject(FlightService);

  protected name = signal('Michael');
  protected filter = signal({
    from: 'London',
    to: 'San Francisco',
    urgent: false
  });

  protected flightRoute = computed(
    () => 'From ' + this.filter().from + ' to ' + this.filter().to + '.'
  );

  // protected flights: Flight[] = [];

  protected get flights() {
    return this.flightService.flights;
  }

  protected basket: Record<number, boolean> = {
    3: true,
    5: true
  };

  constructor() {
    effect(() => console.log(this.flightRoute()));
    effect(() => {
      this.filter();
      untracked(() => this.search());
    });

    setTimeout(() => this.name.set('Mary'), 5_000);
  }

  protected search(): void {
    console.log(this.name());

    if (!this.filter().from || !this.filter().to) {
      return;
    }

    this.flightService.find(
      this.filter().from, this.filter().to, this.filter().urgent
    ).subscribe();
  }

  protected delay(flight: Flight): void {
    const oldFlight = flight;
    const oldDate = new Date(oldFlight.date);

    const newDate = new Date(oldDate.getTime() + 1000 * 60 * 5); // Add 5 min
    const newFlight = {
      ...oldFlight,
      date: newDate.toISOString(),
      delayed: true
    };

    this.flightService.flights = this.flights.map(
      flight => flight.id === newFlight.id ? newFlight : flight
    );
  }

  protected reset(): void {
    this.flightService.flights = [];
  }
}