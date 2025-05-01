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
    return this.footerData.header[this.getCurrentLanguageIndex()];
  }

  openMap(): void {
    window.open('https://www.google.com/maps/place/UGT+Cloudforce/@41.7107022,44.76066,15z/data=!4m10!1m2!2m1!1sUGT!3m6!1s0x40447340ad02f8e7:0xcc3666222f873076!8m2!3d41.7107154!4d44.7709595!15sCgNVR1QiA4gBAZIBG2J1c2luZXNzX25ldHdvcmtpbmdfY29tcGFueaoBNBABKgciA3VndCgAMh4QASIaRKqMXp5C_g9cngE6X6yY7jdtupMXH4BPjd8yBxACIgN1Z3TgAQA!16s%2Fg%2F11flzg5fhc?entry=ttu&g_ep=EgoyMDI1MDQyMy4wIKXMDSoJLDEwMjExNDUzSAFQAw%3D%3D');
  }

  openEmail(): void {
    window.open('https://mail.google.com/mail/u/0/#inbox?compose=GTvVlcSHxwLZqNrbcwTrFHTwvTtRNgfcNmLgSZLsTqXchhRHWFwmlXfwfjvtFsLFvxrbwMgGXMQCS');
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
}