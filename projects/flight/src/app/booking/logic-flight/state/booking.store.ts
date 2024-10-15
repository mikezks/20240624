import { FlightService } from './../data-access/flight.service';
import { patchState, signalStore, withComputed, withMethods, withState } from "@ngrx/signals";
import { FlightFilter } from "../model/flight-filter";
import { Flight, initialFlight } from "../model/flight";
import { computed, inject } from "@angular/core";


export const BookingStore = signalStore(
  { providedIn: 'root' },
  withState({
    filter: {
      from: 'Hamburg',
      to: 'Graz',
      urgent: false
    } as FlightFilter,
    flights: [] as Flight[],
    basket: {
      3: true,
      5: true
    } as Record<number, boolean>
  }),
  withComputed(({ flights, basket }) => ({
    selectedFlights: computed(
      () => flights().filter(flight => basket()[flight.id])
    ),
    delayedFlights: computed(
      () => flights().filter(flight => flight.delayed)
    )
  })),
  /* withComputed(store => {
    const myStoreSelectors = {
      selectedFlights: computed(
        () => store.flights().filter(flight => store.basket()[flight.id])
      ),
    };

    return myStoreSelectors;
  }), */
  /* withMethods(store => {
    const flightService = inject(FlightService);

    const myStoreMethods = {
      updateFilter(from: string, to: string, urgent = false): void {
        patchState(store, { filter: { from, to, urgent }});
      },
      load(): void {
        flightService.find(store.filter.from(), store.filter.to(), store.filter.urgent())
          .subscribe({
            next: flights => patchState(store, { flights })
          });
      }
    };

    return myStoreMethods;
  }), */
  withMethods((
    store,
    flightService = inject(FlightService)
  ) => ({
    updateFilter: (from: string, to: string, urgent = false) =>
      patchState(store, { filter: { from, to, urgent }}),
    load: () => {
      flightService.find(store.filter.from(), store.filter.to(), store.filter.urgent())
        .subscribe({
          next: flights => patchState(store, { flights })
        });
    },
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
    },
    reset: () => patchState(store, { flights: [] })
  }))
);
