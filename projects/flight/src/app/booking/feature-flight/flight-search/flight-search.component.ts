import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BookingStore, Flight, FlightFilter } from '../../logic-flight';
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
  private store = inject(BookingStore);

  protected filter = this.store.filter;
  protected flights = this.store.flights;
  protected basket = this.store.basket;

  protected search(filter: FlightFilter): void {
    this.store.updateFilter(filter.from, filter.to, filter.urgent);

    if (!this.filter.from() || !this.filter.to()) {
      return;
    }

    this.store.load();
  }

  protected delay(flight: Flight): void {
    this.store.delay(flight.id);
  }

  protected reset(): void {
    this.store.reset();
  }
}
