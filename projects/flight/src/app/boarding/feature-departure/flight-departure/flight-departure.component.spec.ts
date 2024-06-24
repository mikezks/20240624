import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FlightDepartureComponent } from './flight-departure.component';

describe('FlightDepartureComponent', () => {
  let component: FlightDepartureComponent;
  let fixture: ComponentFixture<FlightDepartureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FlightDepartureComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FlightDepartureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
