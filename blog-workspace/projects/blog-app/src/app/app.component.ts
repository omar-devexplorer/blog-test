import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <app-header [appTitle]="appTitle"></app-header>
    <router-outlet></router-outlet>
    <app-footer [appTitle]="appTitle"></app-footer>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  appTitle: string = 'Blogging';
}
