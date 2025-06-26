import {
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
  HostListener,
  ElementRef,
  ViewChild,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription, Observable, fromEvent } from 'rxjs';
import { debounceTime } from 'rxjs/operators'; // Fixed import

import { navbarMocks } from '../../../core/mocks/navbarmocks';
import { loginModalMocks } from '../../../core/mocks/login-modal-mocks';
import { LanguageService } from '../../../core/services/language.service';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule],
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

  isAuthenticated$: Observable<boolean>;

  private languageSubscription!: Subscription;
  private resizeSubscription!: Subscription;

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

  @ViewChild('mobileMenu') mobileMenu!: ElementRef;
  @ViewChild('mobileMenuToggle') mobileMenuToggle!: ElementRef;

  constructor(
    private languageService: LanguageService,
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.isAuthenticated$ = this.authService.isAuthenticated$;
  }

  @HostListener('document:click', ['$event'])
  onClick(event: MouseEvent) {
    const target = event.target as HTMLElement;

    // Handle language dropdown
    const languageBtn = document.querySelector('.language-btn');
    const dropdownContent = document.querySelector('.dropdown-content');
    if (
      this.isLanguageDropdownOpen &&
      !languageBtn?.contains(target) &&
      !dropdownContent?.contains(target)
    ) {
      this.isLanguageDropdownOpen = false;
    }

    // Handle mobile menu
    if (
      this.mobileMenuOpen &&
      this.mobileMenuToggle?.nativeElement &&
      this.mobileMenu?.nativeElement &&
      !this.mobileMenuToggle.nativeElement.contains(target) &&
      !this.mobileMenu.nativeElement.contains(target)
    ) {
      this.mobileMenuOpen = false;
    }
  }

  ngOnInit(): void {
    this.currentLanguageIndex = this.languageService.getCurrentLanguage();
    this.languageSubscription = this.languageService.currentLanguage$.subscribe(
      (index) => {
        this.currentLanguageIndex = index;
      }
    );

    this.resizeSubscription = fromEvent(window, 'resize')
      .pipe(debounceTime(100))
      .subscribe(() => {
        if (window.innerWidth > 1050 && this.mobileMenuOpen) {
          this.mobileMenuOpen = false;
        }
      });
  }

  ngOnDestroy(): void {
    if (this.languageSubscription) {
      this.languageSubscription.unsubscribe();
    }
    if (this.resizeSubscription) {
      this.resizeSubscription.unsubscribe();
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
    return item.order === 4;
  }

  isDemoButton(item: any): boolean {
    return item.order === 5;
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
        return 'section4';
      case 3:
        return 'section5';
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

  toggleLanguageDropdown(event: MouseEvent) {
    event.stopPropagation(); // Prevent the click from reaching document listener immediately
    this.isLanguageDropdownOpen = !this.isLanguageDropdownOpen;
  }

  setLanguage(index: number): void {
    this.languageService.setLanguage(index);
    this.isLanguageDropdownOpen = false; // Close dropdown when language is selected
    this.mobileMenuOpen = false;
  }
}
