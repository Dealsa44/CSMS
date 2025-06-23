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

  login(credentials: { username: string; password: string }): Observable<any> {
    return this.apiService.login(credentials).pipe(
      tap((response: any) => {
        // Changed from { token: string } to any
        // Store either the token or a flag in localStorage
        localStorage.setItem(
          this.AUTH_TOKEN_KEY,
          response.token || 'authenticated'
        );
        this.isAuthenticatedSubject.next(true);
        const lang = this.languageService.getCurrentLanguageCode();
        this.router.navigate([`/${lang}/admin-dashboard`]);
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
