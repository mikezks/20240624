import { FlightService } from './../data-access/flight.service';
import { patchState, signalStore, withComputed, withHooks, withMethods, withState } from "@ngrx/signals";
import { rxMethod } from "@ngrx/signals/rxjs-interop";
import { FlightFilter } from "../model/flight-filter";
import { Flight, initialFlight } from "../model/flight";
import { computed, inject } from "@angular/core";
import { filter, pipe, switchMap, tap } from 'rxjs';

type BookingState = {
  filter: FlightFilter;
  flights: Flight[];
  basket: Record<number, boolean>;
}

export const BookingStore = signalStore(
  { providedIn: 'root' },
  withState<BookingState>({
    filter: {
      from: 'Hamburg',
      to: 'Graz',
      urgent: false
    },
    flights: [],
    basket: {
      3: true,
      5: true
    }
  }),
  withComputed(({ flights, basket }) => ({
    selectedFlights: computed(
      () => flights().filter(flight => basket()[flight.id])
    ),
    delayedFlights: computed(
      () => flights().filter(flight => flight.delayed)
    )
  })),
  /**
   * Updaters
   */
  withMethods(store => ({
    updateFilter: (from: string, to: string, urgent = false) =>
      patchState(store, { filter: { from, to, urgent }}),
    addFlights: (flights: Flight[]) => patchState(store, { flights }),
    reset: () => patchState(store, { flights: [] }),
    delay: (id: number) => {
      const oldFlight = store.flights().find(flight => flight.id === id) || initialFlight;
      const oldDate = new Date(oldFlight.date);

      const newDate = new Date(oldDate.getTime() + 1000 * 60 * 5); // Add 5 min
      const newFlight = {
        ...oldFlight,
        date: newDate.toISOString(),
        delayed: true
      };

      patchState(store, { flights: store.flights().map(
        flight => flight.id === newFlight.id ? newFlight : flight
      )});
    }
  })),
  /**
   * Side-Effects
   */
  withMethods((
    store,
    flightService = inject(FlightService)
  ) => ({
    load: () => {
      flightService.find(store.filter.from(), store.filter.to(), store.filter.urgent())
        .subscribe({
          next: flights => store.addFlights(flights)
        });
    },
    triggerLoadFlights: rxMethod<FlightFilter>(pipe(
      filter(filter => !!filter.from && !!filter.to),
      switchMap(filter => flightService.find(filter.from, filter.to, filter.urgent)),
      tap(flights => store.addFlights(flights))
    )),
  })),
  withHooks({
    onInit: store => store.triggerLoadFlights(store.filter)
  })
);
