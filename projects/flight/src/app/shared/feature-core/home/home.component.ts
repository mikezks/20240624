import { Component } from '@angular/core';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
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
