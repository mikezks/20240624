import { inject } from "@angular/core";
import { Router } from "@angular/router";
import { AUTH_STATE } from "./auth.state";




export function authGuard(
  username: string,
  fallbackRoute: string
) {
  return () => (
    inject(AUTH_STATE)().isLoggedIn
    && inject(AUTH_STATE)().username === username
  ) || inject(Router).createUrlTree([fallbackRoute]);
}
