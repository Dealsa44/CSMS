import { Component, EventEmitter, Output } from '@angular/core';
import { navbarMocks } from '../../../core/mocks/navbarmocks';
import { LanguageService } from '../../../core/services/language.service';
import { CommonModule } from '@angular/common';
import { RequestModalComponent } from '../request-modal/request-modal.component';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule], // Add any necessary imports here
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent {
  @Output() requestModalTrigger = new EventEmitter<void>();
  navItems = navbarMocks;
  currentLanguageIndex = 0;
  mobileMenuOpen = false;
  private languageSubscription!: Subscription;
  availableLanguages = [
    { code: 'ka', name: 'ქართული' },
    { code: 'en', name: 'English' },
    { code: 'ru', name: 'Русский' },
  ];
  isLanguageDropdownOpen = false;

  // Filter out non-regular nav items
  get regularNavItems() {
    return this.navItems.filter(
      (item) =>
        !this.isLanguageItem(item) &&
        !this.isDemoButton(item) &&
        item.order !== -1
    );
  }

  constructor(
    private languageService: LanguageService,
    private route: ActivatedRoute,
    private router: Router
  ) {}
  ngOnInit(): void {
    // Subscribe to route params to detect language changes
    this.route.paramMap.subscribe((params) => {
      const langParam = params.get('lang');
      if (langParam) {
        this.languageService.setLanguageFromCode(langParam);
      }
    });

    // Initialize with current language
    this.currentLanguageIndex = this.languageService.getCurrentLanguage();

    // Subscribe to language changes
    this.languageSubscription = this.languageService.currentLanguage$.subscribe(
      (index) => {
        this.currentLanguageIndex = index;
      }
    );
  }

  ngOnDestroy(): void {
    // Clean up subscription
    if (this.languageSubscription) {
      this.languageSubscription.unsubscribe();
    }
  }
  // Your existing methods...
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
        return 'section3';
      case 3:
        return 'section4';
      default:
        return 'main';
    }
  }

  changeLanguage(): void {
    const nextLanguage = this.languageService.getNextLanguage();
    this.languageService.setLanguage(nextLanguage);
  }

  toggleMobileMenu(): void {
    this.mobileMenuOpen = !this.mobileMenuOpen;
  }

  showRequestModal = false;

  openRequestModal(): void {
    this.showRequestModal = true;
  }

  onDemoClick(): void {
    this.requestModalTrigger.emit();
  }
  setLanguage(index: number): void {
    this.languageService.setLanguage(index);
    this.mobileMenuOpen = false; // Close mobile menu if open
    this.isLanguageDropdownOpen = false; // Close the dropdown
  }
}
