import { Component } from '@angular/core';
import { CsmsComponent } from './pages/csms/csms.component';

@Component({
  selector: 'app-root',
  imports: [
    CsmsComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
}
