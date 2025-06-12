// app.routes.ts
import { Routes } from '@angular/router';
import { CsmsComponent } from './pages/csms/csms.component';

export const routes: Routes = [
  { 
    path: ':lang', 
    component: CsmsComponent,
    children: [
      // Add other routes here if needed
    ]
  },
  { path: '', redirectTo: '/en', pathMatch: 'full' }, // Default to English
  { path: '**', redirectTo: '/en' } // Fallback to English
];