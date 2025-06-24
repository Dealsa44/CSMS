import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { ApiService } from './api.service';
import { LanguageService } from './language.service';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly ACCESS_TOKEN_KEY = 'csms_access_token';
  private readonly REFRESH_TOKEN_KEY = 'csms_refresh_token';
  private jwtHelper = new JwtHelperService();
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(this.hasValidToken());
  public isAuthenticated$ = this.isAuthenticatedSubject.asObservable();

  constructor(
    private apiService: ApiService,
    private router: Router,
    private languageService: LanguageService
  ) {}

  private hasValidToken(): boolean {
    const token = this.getAccessToken();
    return !!token && !this.jwtHelper.isTokenExpired(token);
  }

  login(credentials: { username: string; password: string }): Observable<any> {
    return this.apiService.login(credentials).pipe(
      tap((response: any) => {
        this.storeTokens(response);
        this.isAuthenticatedSubject.next(true);
      }),
      catchError((error) => {
        this.clearTokens();
        this.isAuthenticatedSubject.next(false);
        return throwError(() => error);
      })
    );
  }

  logout(): void {
    this.clearTokens();
    this.isAuthenticatedSubject.next(false);
    const lang = this.languageService.getCurrentLanguageCode();
    this.router.navigate([`/${lang}`]);
  }

  refreshToken(): Observable<any> {
    const refreshToken = this.getRefreshToken();
    if (!refreshToken) {
      this.logout();
      return throwError(() => new Error('No refresh token available'));
    }

    return this.apiService.refreshToken({ refresh_token: refreshToken }).pipe(
      tap((response: any) => {
        this.storeAccessToken(response.access_token);
      }),
      catchError((error) => {
        this.logout();
        return throwError(() => error);
      })
    );
  }

  getAccessToken(): string | null {
    return localStorage.getItem(this.ACCESS_TOKEN_KEY);
  }

  getRefreshToken(): string | null {
    return localStorage.getItem(this.REFRESH_TOKEN_KEY);
  }

  private storeTokens(tokens: { access_token: string; refresh_token: string }): void {
    localStorage.setItem(this.ACCESS_TOKEN_KEY, tokens.access_token);
    localStorage.setItem(this.REFRESH_TOKEN_KEY, tokens.refresh_token);
  }

  private storeAccessToken(token: string): void {
    localStorage.setItem(this.ACCESS_TOKEN_KEY, token);
  }

  private clearTokens(): void {
    localStorage.removeItem(this.ACCESS_TOKEN_KEY);
    localStorage.removeItem(this.REFRESH_TOKEN_KEY);
  }

  isAuthenticated(): boolean {
    return this.isAuthenticatedSubject.value;
  }

  getTokenExpiration(): Date | null {
    const token = this.getAccessToken();
    return token ? this.jwtHelper.getTokenExpirationDate(token) : null;
  }

  isTokenExpired(): boolean {
    const token = this.getAccessToken();
    return token ? this.jwtHelper.isTokenExpired(token) : true;
  }
}