import { CommonModule } from '@angular/common';
import { Component, effect, inject, input, output } from '@angular/core';
import { FormBuilder, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { FlightFilter } from '../../logic-flight';


@Component({
  selector: 'app-flight-filter',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './flight-filter.component.html'
})
export class FlightFilterComponent {
  filter = input.required<FlightFilter>()
  filterChange = output<FlightFilter>();

  constructor() {
    effect(() => this.inputFilterForm.setValue(this.filter()))
  }

  protected inputFilterForm = inject(FormBuilder).nonNullable.group({
    from: ['', [Validators.required]],
    to: ['', [Validators.required]],
    urgent: [false],
  });

  protected selectedFilterControl = new FormControl(this.inputFilterForm.getRawValue(), {
    nonNullable: true,
  });

  protected triggerSearch(): void {
    this.filterChange.emit(this.inputFilterForm.getRawValue());
  }
}
