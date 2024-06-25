import { NgIf } from '@angular/common';
import { Component, Signal, effect, inject, input, numberAttribute, signal } from '@angular/core';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { NonNullableFormBuilder, ReactiveFormsModule } from '@angular/forms';
import { validatePassengerStatus } from '../../util-validation';
import { PassengerService } from '../../logic-passenger/data-access/passenger.service';
import { Passenger, initialPassenger } from '../../logic-passenger';
import { switchMap } from 'rxjs';


@Component({
  selector: 'app-passenger-edit',
  standalone: true,
  imports: [
    NgIf,
    ReactiveFormsModule
  ],
  templateUrl: './passenger-edit.component.html'
})
export class PassengerEditComponent {
  // Inject method to access Dependency Injection
  private passengerService = inject(PassengerService);

  // Reactive Signal Input -> Router provides ID from URL
  id = input.required<number, string>({
    transform: numberAttribute
  });

  // Interop between Signals and RxJS
  // Using Operator to fetch State from Backend API
  private passenger = toSignal(
    toObservable(this.id).pipe(
      switchMap(id => this.passengerService.findById(id))
    ), { initialValue: initialPassenger }
  );

  protected editForm = inject(NonNullableFormBuilder).group({
    id: [0],
    firstName: [''],
    name: [''],
    bonusMiles: [0],
    passengerStatus: ['', [
      validatePassengerStatus(['A', 'B', 'C'])
    ]]
  });

  constructor() {
    // We react on Signal changes to update the Reactive Forms value.
    effect(() => this.editForm.patchValue(this.passenger()));
  }

  protected save(): void {
    console.log(this.editForm.value);
  }
}
