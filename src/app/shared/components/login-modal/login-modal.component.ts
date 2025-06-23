import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

import { AuthService } from '../../../core/services/auth.service';
import { LanguageService } from '../../../core/services/language.service';
import { loginModalMocks } from '../../../core/mocks/login-modal-mocks';

@Component({
  selector: 'app-login-modal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login-modal.component.html',
  styleUrls: ['./login-modal.component.scss']
})
export class LoginModalComponent implements OnInit, OnDestroy {
  @Input() isOpen = false;
  @Output() close = new EventEmitter<void>();

  credentials = { username: '', password: '' };
  isLoading = false;
  errorMessage = '';
  
  private langSub!: Subscription;
  private currentLangIndex = 0;
  private texts = loginModalMocks;

  constructor(
    private authService: AuthService,
    private languageService: LanguageService
  ) {}

  ngOnInit(): void {
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

  closeModal() {
    this.errorMessage = '';
    this.credentials = { username: '', password: '' };
    this.close.emit();
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
        this.closeModal();
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