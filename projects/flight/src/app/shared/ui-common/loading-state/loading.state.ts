import { inject, Signal } from "@angular/core";
import { toSignal } from "@angular/core/rxjs-interop";
import { NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router } from "@angular/router";
import { filter, map, Observable } from "rxjs";

export function injectLoadingState(): Signal<boolean> {
  const router = inject(Router);

  return toSignal(
    router.events.pipe(
      filter(ev =>
        ev instanceof NavigationStart
        || ev instanceof NavigationCancel
        || ev instanceof NavigationError
        || ev instanceof NavigationEnd
      ),
      map(ev => ev instanceof NavigationStart)
    ), { initialValue: false }
  );
}
