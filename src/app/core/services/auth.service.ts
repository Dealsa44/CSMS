import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, of, tap } from 'rxjs';
import { ApiService } from './api.service';
import { LanguageService } from './language.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly AUTH_TOKEN_KEY = 'csms_auth_token';
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(
    this.hasToken()
  );
  public isAuthenticated$ = this.isAuthenticatedSubject.asObservable();

  constructor(
    private apiService: ApiService,
    private router: Router,
    private languageService: LanguageService
  ) {}

  private hasToken(): boolean {
    return !!localStorage.getItem(this.AUTH_TOKEN_KEY);
  }

  // auth.service.ts
login(credentials: { username: string; password: string }): Observable<any> {
  return this.apiService.login(credentials).pipe(
    tap((response: any) => {
      localStorage.setItem(
        this.AUTH_TOKEN_KEY,
        response.token || 'authenticated'
      );
      this.isAuthenticatedSubject.next(true);
      // The navigation is now handled by the LoginComponent
    })
  );
}

  logout(): void {
    localStorage.removeItem(this.AUTH_TOKEN_KEY);
    this.isAuthenticatedSubject.next(false);
    const lang = this.languageService.getCurrentLanguageCode();
    this.router.navigate([`/${lang}`]);
  }

  isAuthenticated(): boolean {
    return this.isAuthenticatedSubject.value;
  }
}
