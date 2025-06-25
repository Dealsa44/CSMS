// D:\ZURIKO\WORK\CAR SERVICE MANAGEMENT SYSTEM\CSMS\SRC\app\shared\components\sections\section4\section4.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LanguageService } from '../../../../core/services/language.service';
import { section4Mocks } from '../../../../core/mocks/sections/section4mock';
import { sectionHeadingsMocks } from '../../../../core/mocks/sections/sectionheadings';
import { EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-section4',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './section4.component.html',
  styleUrls: ['./section4.component.scss'],
})
export class section4Component implements OnInit {
  @Output() requestModalTrigger = new EventEmitter<void>();
  pricingData = section4Mocks;
  currentLanguageIndex = 0;
  heading = sectionHeadingsMocks[4]; // Index 1 for the new pricing section heading
  isCollapsed = true;

  constructor(private languageService: LanguageService) {}

  ngOnInit(): void {
    this.languageService.currentLanguage$.subscribe((index) => {
      this.currentLanguageIndex = index;
    });
  }

  getTranslatedText(textArray: string[]): string {
    return textArray[this.currentLanguageIndex];
  }

  getHeading(): string {
    return this.heading.title[this.currentLanguageIndex];
  }

  // Method to handle button click (e.g., navigate to a demo page)
  onDemo(): void {
    this.requestModalTrigger.emit();
  }

  toggleCollapse() {
  this.isCollapsed = !this.isCollapsed;
}
}