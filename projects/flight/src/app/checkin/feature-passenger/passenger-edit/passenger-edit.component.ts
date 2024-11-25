import { Component, effect, inject, input, numberAttribute } from '@angular/core';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { NonNullableFormBuilder, ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { validatePassengerStatus } from '../../util-validation';
import { initialPassenger, Passenger, PassengerService } from '../../logic-passenger';
import { delay, switchMap } from 'rxjs';


@Component({
  selector: 'app-passenger-edit',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    RouterLink
  ],
  templateUrl: './passenger-edit.component.html'
})
export class PassengerEditComponent {
  private passengerService = inject(PassengerService);

  protected editForm = inject(NonNullableFormBuilder).group({
    id: [0],
    firstName: [''],
    name: [''],
    bonusMiles: [0],
    passengerStatus: ['', [
      validatePassengerStatus(['A', 'B', 'C'])
    ]]
  });

  id = input<number, string>(0, { transform: numberAttribute });
  passengerResource = this.passengerService.findByIdAsResource(this.id);

  constructor() {
    setTimeout(() => this.passengerResource.value.set({
      ...initialPassenger,
      firstName: 'Jane',
      name: 'Doe'
    }), 5_000);

    effect(() => {
      const passenger = this.passengerResource.value();

      if (passenger) {
        this.editForm.patchValue(passenger);
      }
    });
  }

  protected save(): void {
    console.log(this.editForm.value);
  }
}

export default PassengerEditComponent;
