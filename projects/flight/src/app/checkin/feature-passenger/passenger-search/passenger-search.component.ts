import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Passenger, PassengerStore } from '../../logic-passenger';


@Component({
  selector: 'app-passenger-search',
  standalone: true,
  imports: [
    RouterLink,
    FormsModule
  ],
  templateUrl: './passenger-search.component.html'
})
export class PassengerSearchComponent {
  private store = inject(PassengerStore);

  firstname = '';
  lastname = 'Smith';
  passengers = this.store.passengerEntities;
  selectedPassenger?: Passenger;

  search(): void {
    /* const passengerState = {
      entities: {
        1: {
          id: 1,
          firstName: 'Peter',
          name: '',
          bonusMiles: 0,
          passengerStatus: ''
        },
        5: {
          id: 5,
          firstName: 'Mary',
          name: '',
          bonusMiles: 0,
          passengerStatus: ''
        }
      },
      ids: [5, 1]
    }; */

    // passengerState.entities[1]

    if (!(this.firstname || this.lastname)) return;

    this.store.loadPassengers({
      firstName: this.firstname,
      name: this.lastname
    });
  }

  select(passenger: Passenger): void {
    this.selectedPassenger = this.selectedPassenger === passenger ? undefined : passenger;
  }
}
