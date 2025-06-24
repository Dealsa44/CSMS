import { Component, EventEmitter, Input, Output } from '@angular/core';
import { RequestModelMocks } from '../../../core/mocks/requestmodelmock';
import { LanguageService } from '../../../core/services/language.service';
import { ApiService } from '../../../core/services/api.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-request-modal',
  imports: [FormsModule, CommonModule], // Add any necessary imports here
  standalone: true,
  templateUrl: './request-modal.component.html',
  styleUrls: ['./request-modal.component.scss'],
})
export class RequestModalComponent {
  @Input() visible = false;
  @Output() visibleChange = new EventEmitter<boolean>();
  contactData = RequestModelMocks;
  formData: any = {};
  showNotification = false;
  formErrors: any = {};
  private notificationTimeout: any;

  constructor(
    private languageService: LanguageService,
    private apiService: ApiService
  ) {}
  getCurrentLanguageIndex(): number {
    return this.languageService.getCurrentLanguage();
  }

  getText(item: any): string {
    return item.title[this.getCurrentLanguageIndex()];
  }

  closeModal(): void {
    this.visible = false;
    this.visibleChange.emit(false);
    this.resetForm();
  }

  validateForm(): boolean {
    this.formErrors = {};
    let isValid = true;

    // Full Name validation (order: 1)
    if (!this.formData[1] || this.formData[1].trim() === '') {
      this.formErrors.fullName = this.getText(this.contactData[7]);
      isValid = false;
    }

    // Phone (order: 3) or Email (order: 4) validation
    const phone = this.formData[3] ? this.formData[3].trim() : '';
    const email = this.formData[4] ? this.formData[4].trim() : '';

    if (phone && !this.validatePhone(phone)) {
      this.formErrors.phone = this.getText(this.contactData[10]);
      isValid = false;
    }
    if (email && !this.validateEmail(email)) {
      this.formErrors.email = this.getText(this.contactData[9]);
      isValid = false;
    }
    if (!phone && !email) {
      this.formErrors.contact = this.getText(this.contactData[8]);
      isValid = false;
    }

    return isValid;
  }

  validateEmail(email: string): boolean {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  }

  validatePhone(phone: string): boolean {
    // Remove all non-digit characters
    const cleanedPhone = phone.replace(/\D/g, '');
    // Check for at least 7 digits (same as backend)
    return cleanedPhone.length >= 7;
  }

  onSubmit(): void {
    if (!this.validateForm()) {
      return;
    }

    const userData = {
      name: this.formData[1],
      company: this.formData[2] || undefined,
      email: this.formData[4] || undefined,
      phone: this.formData[3] || undefined,
    };

    this.apiService.registerUser(userData).subscribe({
      next: (response) => {
        console.log('Registration successful:', response);
        this.showNotification = true;
        this.resetForm();

        this.notificationTimeout = setTimeout(() => {
          this.dismissNotification();
        }, 5000);
      },
      error: (error) => {
        console.error('Registration failed:', error);
        // Handle error (show error message)
      },
    });
  }

  dismissNotification(): void {
    this.showNotification = false;
    if (this.notificationTimeout) {
      clearTimeout(this.notificationTimeout);
    }
  }

  resetForm(): void {
    this.formData = {};
    this.formErrors = {};
  }

  ngOnDestroy(): void {
    if (this.notificationTimeout) {
      clearTimeout(this.notificationTimeout);
    }
  }
}
