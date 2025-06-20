import { Component, OnInit } from '@angular/core';
import { LanguageService } from '../../../../core/services/language.service';
import { ApiService } from '../../../../core/services/api.service';
import { sectionHeadingsMocks } from '../../../../core/mocks/sections/sectionheadings';
import { section4Mocks } from '../../../../core/mocks/sections/section4mock';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-section4',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './section4.component.html',
  styleUrls: ['./section4.component.scss'],
})
export class Section4Component implements OnInit {
  heading = sectionHeadingsMocks[4]; // Contact heading
  content = section4Mocks;
  currentLanguageIndex = 0;
  phoneNumber = '+995';
  showNotification = false;
  notificationMessage = '';
  private notificationTimeout: any;

  constructor(
    private languageService: LanguageService,
    private apiService: ApiService
  ) {}

  ngOnInit(): void {
    this.languageService.currentLanguage$.subscribe((index) => {
      this.currentLanguageIndex = index;
    });
  }

  getText(item: any): string {
    return item.title[this.currentLanguageIndex];
  }

  onSubmit(): void {
    // Basic validation
    if (!this.phoneNumber || this.phoneNumber.length < 4) {
      this.notificationMessage = this.getText(this.content[6]); // Invalid phone number message
      this.showNotification = true;
      this.resetNotification();
      return;
    }

    // Remove any non-digit characters (except + if present)
    const cleanedPhone = this.phoneNumber.replace(/[^\d+]/g, '');

    this.apiService.savePhoneNumber(cleanedPhone).subscribe({
      next: (response) => {
        console.log('Phone number saved:', response);
        this.notificationMessage = this.getText(this.content[4]); // Success message
        this.showNotification = true;
        this.phoneNumber = '+995'; // Reset to default
        this.resetNotification();
      },
      error: (error) => {
        console.error('Failed to save phone number:', error);
        this.notificationMessage = this.getText(this.content[5]); // Error message
        this.showNotification = true;
        this.resetNotification();
      },
    });
  }

  private resetNotification(): void {
    if (this.notificationTimeout) {
      clearTimeout(this.notificationTimeout);
    }
    this.notificationTimeout = setTimeout(() => {
      this.dismissNotification();
    }, 5000);
  }

  dismissNotification(): void {
    this.showNotification = false;
    if (this.notificationTimeout) {
      clearTimeout(this.notificationTimeout);
    }
  }

  ngOnDestroy(): void {
    if (this.notificationTimeout) {
      clearTimeout(this.notificationTimeout);
    }
  }
}