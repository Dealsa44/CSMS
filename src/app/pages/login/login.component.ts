import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';

import { AuthService } from '../../core/services/auth.service';
import { LanguageService } from '../../core/services/language.service';
import { loginModalMocks } from '../../core/mocks/login-modal-mocks';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  credentials = { username: '', password: '' };
  isLoading = false;
  errorMessage = '';
  
  private langSub!: Subscription;
  private currentLangIndex = 0;
  private texts = loginModalMocks;

  constructor(
    private authService: AuthService,
    private languageService: LanguageService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

   ngOnInit(): void {
    // Initialize language from route parameter
    this.route.paramMap.subscribe(params => {
      const langCode = params.get('lang');
      if (langCode) {
        this.languageService.setLanguageFromCode(langCode);
      }
    });

    this.langSub = this.languageService.currentLanguage$.subscribe(index => {
      this.currentLangIndex = index;
    });
  }

  ngOnDestroy(): void {
    if (this.langSub) {
      this.langSub.unsubscribe();
    }
  }

  getLoginText(key: string): string {
    return this.texts[key][this.currentLangIndex];
  }

  onSubmit(): void {
    if (!this.credentials.username || !this.credentials.password) {
      this.errorMessage = this.getLoginText('errorRequired');
      return;
    }
    
    this.isLoading = true;
    this.errorMessage = '';

    this.authService.login(this.credentials).subscribe({
      next: () => {
        this.isLoading = false;
        const lang = this.languageService.getCurrentLanguageCode();
        this.router.navigate([`/${lang}/admin-dashboard`]);
      },
      error: (err: HttpErrorResponse) => {
        this.isLoading = false;
        if (err.status === 401) {
          this.errorMessage = this.getLoginText('errorInvalid');
        } else {
          this.errorMessage = this.getLoginText('errorServer');
        }
      }
    });
  }
}