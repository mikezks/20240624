import { inject } from "@angular/core";
import { NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router } from "@angular/router";
import { filter, map, Observable } from "rxjs";

export function injectLoadingState(): Observable<boolean> {
  const router = inject(Router);

  return router.events.pipe(
    filter(ev =>
      ev instanceof NavigationStart
      || ev instanceof NavigationCancel
      || ev instanceof NavigationError
      || ev instanceof NavigationEnd
    ),
    map(ev => ev instanceof NavigationStart)
  );
}
