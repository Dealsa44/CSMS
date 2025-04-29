import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { LanguageService } from '../../../../core/services/language.service';
import { sectionHeadingsMocks } from '../../../../core/mocks/sections/sectionheadings';
import { section3Mocks } from '../../../../core/mocks/sections/section3mock';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-section3',
  standalone: true,
  imports: [CommonModule], // Add any necessary imports here
  templateUrl: './section3.component.html',
  styleUrls: ['./section3.component.scss']
})
export class Section3Component implements OnInit {
  @Output() requestModalTrigger = new EventEmitter<void>();
  heading = sectionHeadingsMocks[3]; // Section 3 heading
  items = section3Mocks[0];
  contents = section3Mocks[1];
  currentLanguageIndex = 0;
  activeItemIndex = 0;

  constructor(private languageService: LanguageService) {}

  ngOnInit(): void {
    this.languageService.currentLanguage$.subscribe(index => {
      this.currentLanguageIndex = index;
    });
  }

  getText(item: any): string {
    return item.title[this.currentLanguageIndex];
  }

  getContent(item: any): string {
    return item.title[this.currentLanguageIndex];
  }

  getLinkText(item: any): string {
    return item.link[this.currentLanguageIndex];
  }

  setActiveItem(index: number): void {
    this.activeItemIndex = index;
  }

  getImagePath(): string {
    return `assets/imgs/section3/pic${this.activeItemIndex + 1}.png`;
  }
  onLearnMore(): void {
    this.requestModalTrigger.emit();
  }
}