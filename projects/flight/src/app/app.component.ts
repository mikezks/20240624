import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderbarComponent, SidebarComponent } from './shared/ui-core';
import { injectLoadingState } from './shared/ui-common/loading-state/loading.state';
import { AsyncPipe } from '@angular/common';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    AsyncPipe,
    RouterOutlet,
    HeaderbarComponent,
    SidebarComponent
  ],
  template: `
    <div class="wrapper">
      <div class="sidebar" data-color="white" data-active-color="danger">
        <app-sidebar-cmp>
          <p>Loading: {{ loading$ | async }}</p>
        </app-sidebar-cmp>
      </div>

      <div class="main-panel">
        <app-headerbar-cmp />

        <div class="content">

          <router-outlet />

        </div>

      </div>
    </div>
  `
})
export class AppComponent {
  loading$ = injectLoadingState();
}
