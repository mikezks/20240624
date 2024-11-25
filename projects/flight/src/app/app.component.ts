import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { injectLoadingState } from './shared/ui-common/loading-state/loading.state';
import { HeaderbarComponent, SidebarComponent } from './shared/ui-core';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    HeaderbarComponent,
    SidebarComponent
  ],
  template: `
    <div class="wrapper">
      <div class="sidebar" data-color="white" data-active-color="danger">
        <app-sidebar-cmp>
          <div class="loading-state">Loading: {{ loading() }}</div>
        </app-sidebar-cmp>
      </div>

      <div class="main-panel">
        <app-headerbar-cmp />

        <div class="content">

          <router-outlet />

        </div>

      </div>
    </div>
  `,
  styles: `
    .loading-state {
      margin: 30px;
    }
  `
})
export class AppComponent {
  loading = injectLoadingState();
}
