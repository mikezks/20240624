import { Component } from '@angular/core';
import { injectUsername } from '@flight-workspace/config-lib';


@Component({
  selector: 'app-home',
  template: `
    <div class="card">
      <div class="card-header">
        <h2 class="card-title">Reactive Angular</h2>
      </div>

      <div class="card-body">
        <ul>
          <li>Reactive Programming w/ RxJS</li>
          <li>Signals</li>
          <li>Enterprise State Management</li>
        </ul>

        <p>{{ username() }}</p>
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
  username = injectUsername();
}
