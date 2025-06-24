import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription, Observable } from 'rxjs';

import { navbarMocks } from '../../../core/mocks/navbarmocks';
import { loginModalMocks } from '../../../core/mocks/login-modal-mocks';
import { LanguageService } from '../../../core/services/language.service';
import { AuthService } from '../../../core/services/auth.service';

// Import the new Login Modal Component
@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule], // Add LoginModalComponent here
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit, OnDestroy {
  @Output() requestModalTrigger = new EventEmitter<void>();

  navItems = navbarMocks;
  loginTexts = loginModalMocks;
  currentLanguageIndex = 0;
  mobileMenuOpen = false;
  isLanguageDropdownOpen = false;

  // --- NEW ---
  isAuthenticated$: Observable<boolean>;
  // --- END NEW ---

  private languageSubscription!: Subscription;

  availableLanguages = [
    { code: 'ka', name: 'ქართული' },
    { code: 'en', name: 'English' },
    { code: 'ru', name: 'Русский' },
  ];
  
  private languageFlags = [
    'assets/imgs/navbar/pic1.svg',
    'assets/imgs/navbar/pic2.svg',
    'assets/imgs/navbar/pic3.svg',
  ];

  constructor(
    private languageService: LanguageService,
    private authService: AuthService, // Inject AuthService
    private route: ActivatedRoute,
    private router: Router
  ) {
    // --- NEW ---
    this.isAuthenticated$ = this.authService.isAuthenticated$;
    // --- END NEW ---
  }

  ngOnInit(): void {
    // ... your existing ngOnInit logic ...
    this.currentLanguageIndex = this.languageService.getCurrentLanguage();
    this.languageSubscription = this.languageService.currentLanguage$.subscribe(
      (index) => {
        this.currentLanguageIndex = index;
      }
    );
  }

  ngOnDestroy(): void {
    if (this.languageSubscription) {
      this.languageSubscription.unsubscribe();
    }
  }
  
  // --- NEW METHODS for Login Modal ---



  
  logout(): void {
    this.authService.logout();
  }
  // --- END NEW ---

  // ... all your other existing methods (getRegularNavItems, getNavItemTitle, etc.) ...
  get regularNavItems() {
    return this.navItems.filter(
      (item) =>
        !this.isLanguageItem(item) &&
        !this.isDemoButton(item) &&
        item.order !== -1
    );
  }
   isLanguageItem(item: any): boolean {
    return item.order === 5;
  }

  isDemoButton(item: any): boolean {
    return item.order === 6;
  }

  getNavItemTitle(item: any): string {
    if (Array.isArray(item.title)) {
      return item.title[this.currentLanguageIndex];
    }
    return item.title;
  }

  getCurrentLanguageText(): string {
    const languageItem = this.navItems.find((item) =>
      this.isLanguageItem(item)
    );
    return this.getNavItemTitle(languageItem);
  }

  getDemoButtonText(): string {
    const demoItem = this.navItems.find((item) => this.isDemoButton(item));
    return this.getNavItemTitle(demoItem);
  }

  scrollToSection(sectionId: string): void {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  getSectionForNavItem(order: number): string {
    switch (order) {
      case 0:
        return 'section1';
      case 1:
        return 'section2';
      case 2:
        return 'section3';
      case 3:
        return 'section4';
      case 4:
        return 'section5'
      default:
        return 'main';
    }
  }
  getCurrentLanguageFlag(): string {
    return this.languageFlags[this.currentLanguageIndex];
  }

  getLanguageFlag(index: number): string {
    return this.languageFlags[index];
  }
  toggleMobileMenu(): void {
    this.mobileMenuOpen = !this.mobileMenuOpen;
  }
  onDemoClick(): void {
    this.requestModalTrigger.emit();
  }

  setLanguage(index: number): void {
    this.languageService.setLanguage(index);
    this.mobileMenuOpen = false;
    this.isLanguageDropdownOpen = false;
  }
}