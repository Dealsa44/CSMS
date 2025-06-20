import { Routes } from '@angular/router';
import { CsmsComponent } from './pages/csms/csms.component';
import { AdminDashboardComponent } from './shared/components/admin-dashboard/admin-dashboard.component';

export const routes: Routes = [
  { 
    path: ':lang', 
    component: CsmsComponent,
    children: [
      // Add other routes here if needed
    ]
  },
  // { 
  //   path: ':lang/admin-dashboard', 
  //   component: AdminDashboardComponent 
  // },
  { path: '', redirectTo: '/ka', pathMatch: 'full' }, // Default to Georgian
  { path: '**', redirectTo: '/ka' }, // Fallback to Georgian
];