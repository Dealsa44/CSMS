// D:\ZURIKO\WORK\CAR SERVICE MANAGEMENT SYSTEM\CSMS\SRC\app\shared\components\sections\section1\section1.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LanguageService } from '../../../../core/services/language.service';
import { section1Mocks } from '../../../../core/mocks/sections/section1mock';
import { sectionHeadingsMocks } from '../../../../core/mocks/sections/sectionheadings';
import { EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-section1',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './section1.component.html',
  styleUrls: ['./section1.component.scss'],
})
export class Section1Component implements OnInit {
  @Output() requestModalTrigger = new EventEmitter<void>();
  pricingData = section1Mocks;
  currentLanguageIndex = 0;
  heading = sectionHeadingsMocks[1]; // Index 1 for the new pricing section heading

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
}