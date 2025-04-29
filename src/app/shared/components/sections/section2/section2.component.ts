import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { LanguageService } from '../../../../core/services/language.service';
import { sectionHeadingsMocks } from '../../../../core/mocks/sections/sectionheadings';
import { section2Mocks } from '../../../../core/mocks/sections/section2mock';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-section2',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './section2.component.html',
  styleUrls: ['./section2.component.scss']
})
export class Section2Component implements OnInit {
  @Output() requestModalTrigger = new EventEmitter<void>();
  heading = sectionHeadingsMocks[2]; // Third heading is for section2
  titles = section2Mocks[0];
  contents = section2Mocks[1];
  currentLanguageIndex = 0;
  activeIndex = 0;
  expandedItems: boolean[] = [];

  constructor(private languageService: LanguageService) {}

  ngOnInit(): void {
    this.languageService.currentLanguage$.subscribe(index => {
      this.currentLanguageIndex = index;
    });
    // Initialize all items as collapsed
    this.expandedItems = new Array(this.titles.length).fill(false);
  }

  getHeading(): string {
    return this.heading.title[this.currentLanguageIndex];
  }

  getTitle(item: any): string {
    if (Array.isArray(item.title)) {
      return item.title[this.currentLanguageIndex];
    }
    return item.title;
  }

  getContent(item: any): string {
    if (Array.isArray(item.title)) {
      return item.title[this.currentLanguageIndex];
    }
    return item.title;
  }

  getLinkText(item: any): string {
    if (Array.isArray(item.link)) {
      return item.link[this.currentLanguageIndex];
    }
    return item.link;
  }

  toggleItem(index: number): void {
    // If clicking the currently active item, just toggle its expanded state
    if (this.activeIndex === index) {
      this.expandedItems[index] = !this.expandedItems[index];
    } else {
      // Set all items to collapsed
      this.expandedItems.fill(false);
      // Set the clicked item as active and expanded
      this.activeIndex = index;
      this.expandedItems[index] = true;
    }
  }

  getImagePath(): string {
    return `assets/imgs/section2/pic${this.activeIndex + 1}.png`;
  }

  onLearnMore(): void {
    this.requestModalTrigger.emit();
  }
}