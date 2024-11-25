import { InjectionToken, signal, WritableSignal } from "@angular/core";

export type AuthState = {
  username: string;
  isLoggedIn: boolean;
};

export const initialAuthState: AuthState = {
  username: 'mary.smith',
  isLoggedIn: true
};

export const AUTH_STATE = new InjectionToken<WritableSignal<AuthState>>('AUTH_STATE', {
  providedIn: 'root',
  factory: () => signal(initialAuthState)
});
