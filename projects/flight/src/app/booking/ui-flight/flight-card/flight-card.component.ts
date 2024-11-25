import { DatePipe, NgStyle } from '@angular/common';
import { afterNextRender, ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, inject, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { RouterLink } from '@angular/router';
import { injectCdBlink } from '../../../shared/util-cd-visualizer';
import { Flight } from '../../logic-flight';


@Component({
  selector: 'app-flight-card',
  standalone: true,
  imports: [
    NgStyle, DatePipe,
    RouterLink
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="card ssr" [class.csr]="isCsrActive">
      <div class="card-header">
        <h2 class="card-title">{{ item?.from }} - {{ item?.to }}</h2>
      </div>

      <div class="card-body">
        <p>Flight-No.: #{{ item?.id }}</p>
        <p>Flight-No.: #{{ item?.date | date : "dd.MM.yyyy HH:mm" }}</p>
        <p>
          <button
            (click)="toggleSelection()"
            class="btn btn-info btn-sm"
            style="min-width: 85px; margin-right: 5px"
          >{{ selected ? "Remove" : "Select" }}</button>
          <a
            [routerLink]="['../edit', item?.id]"
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
  cdRef = inject(ChangeDetectorRef);

  @Input() item?: Flight;
  @Input() selected = false;
  @Output() selectedChange = new EventEmitter<boolean>();
  @Output() delayTrigger = new EventEmitter<Flight>();

  isCsrActive = false;

  constructor() {
    afterNextRender(() => {
      this.isCsrActive = true;
      this.cdRef.markForCheck();
    });
  }

  ngOnInit(): void {
    console.log('%cFlight Card INIT ' + this.item?.id, '{ color: green; }')
  }

  toggleSelection(): void {
    this.selected = !this.selected;
    this.selectedChange.emit(this.selected);
  }

  delay(): void {
    this.delayTrigger.emit(this.item);
  }

  ngOnDestroy(): void {
    console.log('%cFlight Card DESTROY ' + this.item?.id, '{ color: red; }')
  }
}
