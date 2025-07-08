import { Component, OnInit } from '@angular/core';
import { LanguageService } from '../../../../core/services/language.service';
import { ApiService } from '../../../../core/services/api.service';
import { sectionHeadingsMocks } from '../../../../core/mocks/sections/sectionheadings';
import { section5Mocks } from '../../../../core/mocks/sections/section5mock';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-section5',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './section5.component.html',
  styleUrls: ['./section5.component.scss'],
})
export class section5Component implements OnInit {
  heading = sectionHeadingsMocks[5]; // Contact heading
  content = section5Mocks;
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

  /**
   * Prevents non-numeric characters and '+' from being typed,
   * except for '+' at the very beginning.
   */
  onKeyDown(event: KeyboardEvent): void {
    const input = event.target as HTMLInputElement;
    const value = input.value;
    const key = event.key;

    // Allow navigation keys, backspace, delete, tab
    if (
      key === 'Backspace' ||
      key === 'Delete' ||
      key === 'Tab' ||
      key === 'ArrowLeft' ||
      key === 'ArrowRight' ||
      key === 'Home' ||
      key === 'End'
    ) {
      return;
    }

    // Allow numbers
    if (/\d/.test(key)) {
      return;
    }

    // Allow '+' only if it's the first character being typed and the input is empty
    if (key === '+' && input.selectionStart === 0 && !value.includes('+')) {
      return;
    }

    // Prevent any other character
    event.preventDefault();
  }

  /**
   * Filters pasted content to ensure only numbers and a leading '+' are allowed.
   */
  onPaste(event: ClipboardEvent): void {
    const clipboardData = event.clipboardData;
    if (!clipboardData) {
      return;
    }

    event.preventDefault(); // Stop the default paste behavior
    const pastedText = clipboardData.getData('text');
    let filteredText = '';

    if (pastedText.startsWith('+')) {
      filteredText = '+' + pastedText.substring(1).replace(/[^0-9]/g, '');
    } else {
      filteredText = pastedText.replace(/[^0-9]/g, '');
    }

    // Get the current input element and its value
    const inputElement = event.target as HTMLInputElement;
    const currentValue = inputElement.value;
    const selectionStart = inputElement.selectionStart || 0;
    const selectionEnd = inputElement.selectionEnd || 0;

    // Construct the new value
    const newValue =
      currentValue.substring(0, selectionStart) +
      filteredText +
      currentValue.substring(selectionEnd);

    // Update the ngModel (phoneNumber) and then the input element
    this.phoneNumber = newValue;
    // Manually update the input element's value since we prevented default paste
    inputElement.value = this.phoneNumber;

    // Dispatch an input event to ensure ngModel updates correctly if needed by other directives
    inputElement.dispatchEvent(new Event('input'));
  }

  onSubmit(): void {
    // Basic validation
    if (!this.phoneNumber || this.phoneNumber.length < 4) {
      this.notificationMessage = this.getText(this.content[6]); // Invalid phone number message
      this.showNotification = true;
      this.resetNotification();
      return;
    }

    // The phoneNumber should already be clean due to onKeyDown and onPaste,
    // but a final clean-up here is good for robustness.
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