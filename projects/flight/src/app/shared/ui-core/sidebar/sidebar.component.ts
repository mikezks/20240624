import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { NavigationComponent } from '@flight-workspace/navigation';


@Component({
  selector: 'app-sidebar-cmp',
  standalone: true,
  imports: [
    NavigationComponent
  ],
  template: `
    <div class="sidebar-wrapper">
      <div class="logo">
        <a href="http://angulararchitects.io" class="simple-text logo-mini">
          <div class="logo-image-small">
            <img src="assets/paper-design/angular_gradient.png" alt="Angular Logo" />
          </div>
        </a>
        <a href="http://angulararchitects.io" class="simple-text logo-normal">
          Flights 42
        </a>
      </div>

      <ng-content />

      <app-navigation />

    </div>
  `
})
export class SidebarComponent {}
