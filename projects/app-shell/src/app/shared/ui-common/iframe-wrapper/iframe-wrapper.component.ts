import { Component, computed, inject, input } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'mfe-iframe',
  standalone: true,
  template: `<iframe [src]="safeUrl()" class="iframe" #iframe></iframe>`,
  styles: [`
    :host {
      display: flex;
      width: 100%;
      height: 570px;
      flex-direction: column;
    }

    .iframe {
      flex-grow: 1;
      border: none;
      margin: 0;
      padding: 0;
    }
  `]
})
export class IframeWrapperComponent {
  sanitizer = inject(DomSanitizer);

  url = input('');

  safeUrl = computed(
    () => this.sanitizer.bypassSecurityTrustResourceUrl(
      this.url().split('.').join('/')
    )
  );
}
