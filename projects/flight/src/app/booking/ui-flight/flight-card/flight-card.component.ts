import { DatePipe } from '@angular/common';
import { afterNextRender, ChangeDetectionStrategy, Component, input, model, OnDestroy, OnInit, output, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { injectCdBlink } from '../../../shared/util-cd-visualizer';
import { Flight } from '../../logic-flight';


@Component({
  selector: 'app-flight-card',
  standalone: true,
  imports: [
    DatePipe,
    RouterLink
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="card ssr" [class.csr]="isCsrActive()">
      <div class="card-header">
        <h2 class="card-title">{{ item().from }} - {{ item().to }}</h2>
      </div>

      <div class="card-body">
        <p>Flight-No.: #{{ item().id }}</p>
        <p>Flight-No.: #{{ item().date | date : "dd.MM.yyyy HH:mm" }}</p>
        <p>
          <button
            (click)="toggleSelection()"
            class="btn btn-info btn-sm"
            style="min-width: 85px; margin-right: 5px"
          >{{ selected() ? "Remove" : "Select" }}</button>
          <a
            [routerLink]="['../edit', item().id]"
            class="btn btn-success btn-sm"
            style="min-width: 85px; margin-right: 5px"
          >Edit</a>
          <button
            (click)="delay()"
            class="btn btn-danger btn-sm"
            style="min-width: 85px; margin-right: 5px"
          >Delay</button>
        </p>
      </div>
    </div>

    <!-- {{ blink() }} -->
  `,
  styles: `
    .ssr {
      background-color: grey;
    }

    .csr {
      background-color: white;
    }
  `
})
export class FlightCardComponent implements OnInit, OnDestroy {
  blink = injectCdBlink();

  readonly item = input.required<Flight>();
  readonly selected = model(false);
  readonly itemChange = output<Flight>();

  readonly isCsrActive = signal(false);

  constructor() {
    afterNextRender(() => {
      this.isCsrActive.set(true);
    });
  }

  ngOnInit(): void {
    console.log('%cFlight Card INIT ' + this.item().id, 'color: green;')
  }

  toggleSelection(): void {
    this.selected.update(value => !value);
  }

  delay(): void {
    this.itemChange.emit(this.item());
  }

  ngOnDestroy(): void {
    console.log('%cFlight Card DESTROY ' + this.item().id, 'color: red;')
  }
}
