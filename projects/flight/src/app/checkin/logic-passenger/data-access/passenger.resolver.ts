import { ActivatedRouteSnapshot } from "@angular/router";
import { Observable } from "rxjs";
import { Passenger } from "../model/passenger";
import { inject } from "@angular/core";
import { PassengerService } from "./passenger.service";


export function passengerResolver(route: ActivatedRouteSnapshot): Observable<Passenger> {
  const passengerService = inject(PassengerService);

  const id = +(route.paramMap.get('id') || 0);

  return passengerService.findById(id);
}
