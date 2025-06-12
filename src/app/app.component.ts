// app.component.ts
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CsmsComponent } from './pages/csms/csms.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet
],
  template: `
    <router-outlet></router-outlet>
  `,
  styleUrl: './app.component.scss',
})
export class AppComponent {
}