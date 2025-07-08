import { Component, OnInit, HostListener} from '@angular/core';
import { CommonModule } from '@angular/common';
import { LanguageService } from '../../../../core/services/language.service';
import { section4Mocks } from '../../../../core/mocks/sections/section4mock';
import { sectionHeadingsMocks } from '../../../../core/mocks/sections/sectionheadings';

@Component({
  selector: 'app-section4',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './section4.component.html',
  styleUrls: ['./section4.component.scss'], // Ensure this path is correct
})
export class section4Component implements OnInit {
  pricingData = section4Mocks;
  currentLanguageIndex = 0;
  heading = sectionHeadingsMocks[4]; // Index 4 for the pricing section heading
  isCollapsed = true;
  selectedPlan: 'basic' | 'standard' | 'premium' = 'basic'; // Default to 'basic'
  isSmallScreen: boolean = false; // To track screen size

  constructor(private languageService: LanguageService) {}

  ngOnInit(): void {
    this.languageService.currentLanguage$.subscribe((index) => {
      this.currentLanguageIndex = index;
    });

    // Initial check for screen size
    this.checkScreenSize();
  }

  // Listen for window resize events to update isSmallScreen
  @HostListener('window:resize', ['$event'])
  onResize(event: Event): void {
    this.checkScreenSize();
  }

  // Method to determine if the screen is small
  checkScreenSize(): void {
    // You can adjust this breakpoint (750) to match your SCSS media query breakpoint
    this.isSmallScreen = window.innerWidth <= 815;
  }

  getTranslatedText(textArray: string[]): string {
    return textArray[this.currentLanguageIndex];
  }

  getHeading(): string {
    return this.heading.title[this.currentLanguageIndex];
  }

  toggleCollapse() {
    this.isCollapsed = !this.isCollapsed;
  }

  // New method to select the active plan
  selectPlan(plan: 'basic' | 'standard' | 'premium'): void {
    this.selectedPlan = plan;
    // When a plan is selected on a small screen, ensure it's not collapse
  }
}