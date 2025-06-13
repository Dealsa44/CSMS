import { Component } from '@angular/core';
import { footerMock } from '../../../core/mocks/footermock';
import { LanguageService } from '../../../core/services/language.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {
  footerData = footerMock;
  currentYear = new Date().getFullYear();

  isMobileDevice(): boolean {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  }
  
  constructor(private languageService: LanguageService) {}

  getCurrentLanguageIndex(): number {
    return this.languageService.getCurrentLanguage();
  }

  getHeader(): string {
    // Get the first item from footerMock (order: 0) and return the appropriate language
    const headerItem = this.footerData.find(item => item.order === 0);
    return headerItem ? headerItem.title[this.getCurrentLanguageIndex()] : '';
  }

  getAddress(): string {
    // Get the second item from footerMock (order: 1) and return the appropriate language
    const addressItem = this.footerData.find(item => item.order === 1);
    return addressItem ? addressItem.title[this.getCurrentLanguageIndex()] : '';
  }

  openMap(): void {
    window.open('https://maps.app.goo.gl/4zFFzBTHFMBdebpN7');
  }

  openSocial(url: string): void {
    window.open(url, '_blank');
  }

  handlePhoneClick(): void {
    if (this.isMobileDevice()) {
      window.location.href = 'tel:+995322220505';
    }
    // On desktop, do nothing (just the text will be displayed)
  }

  handleEmailClick(): void {
    if (this.isMobileDevice()) {
      // For mobile devices - open default email app
      window.location.href = 'mailto:ugt@ugt.ge';
    } else {
      // For desktop - keep existing behavior
      this.openEmail();
    }
  }
  
  openEmail(): void {
    window.open('https://mail.google.com/mail/?view=cm&fs=1&to=ugt@ugt.ge', '_blank');
  }
}