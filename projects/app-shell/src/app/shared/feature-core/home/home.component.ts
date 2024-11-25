import { Component } from '@angular/core';
import { injectUsername } from '@flight-workspace/config-lib';


@Component({
  selector: 'app-home',
  template: `
    <div class="card">
      <div class="card-header">
        <h2 class="card-title">App Shell</h2>
      </div>

      <div class="card-body">
        <ul>
          <li>Load Angular SSR App</li>
        </ul>
      </div>
    </div>
  `,
  styles: [`
    code {
      color: blue;
    }
  `]
})
export class HomeComponent {
}
