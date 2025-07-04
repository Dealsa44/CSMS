import { Routes } from '@angular/router';
import { CsmsComponent } from './pages/csms/csms.component';
import { AdminDashboardComponent } from './shared/components/admin-dashboard/admin-dashboard.component';
import { AuthGuard } from './core/services/auth.guard';
import { LoginComponent } from './pages/login/login.component';

export const routes: Routes = [
  { 
    path: ':lang', 
    component: CsmsComponent,
    children: [
      // Add other routes here if needed
    ]
  },
   { 
    path: ':lang/login', 
    component: LoginComponent // This will be our new login page
  },
  { 
    path: ':lang/admin-dashboard', 
    component: AdminDashboardComponent,
    canActivate: [AuthGuard] // Apply the guard here
  },
  { path: '', redirectTo: '/ka', pathMatch: 'full' }, // Default to Georgian
  { path: '**', redirectTo: '/ka' }, // Fallback to Georgian
];