import { Component, OnInit } from '@angular/core';
import { LanguageService } from '../../../../core/services/language.service';
import { sectionHeadingsMocks } from '../../../../core/mocks/sections/sectionheadings';
import { section1Mocks } from '../../../../core/mocks/sections/section1mock';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-section1',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './section1.component.html',
  styleUrls: ['./section1.component.scss'],
})
export class section1Component implements OnInit {
  heading = sectionHeadingsMocks[1]; // Second heading is for section1
  challenges = section1Mocks;
  currentLanguageIndex = 0;

  constructor(private languageService: LanguageService) {}

  ngAfterViewInit() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            entry.target.classList.add('animate');
          }, index * 100);
        }
      });
    }, {threshold: 0.1});
  
    document.querySelectorAll('.challenge-card').forEach(card => {
      observer.observe(card);
    });
  }

  ngOnInit(): void {
    this.languageService.currentLanguage$.subscribe((index) => {
      this.currentLanguageIndex = index;
    });
  }

  getHeading(): string {
    return this.heading.title[this.currentLanguageIndex];
  }

  getSubheading(): string {
    return this.challenges.subheading[this.currentLanguageIndex];
  }

  getChallengeTitle(challenge: any): string {
    if (Array.isArray(challenge.title)) {
      return challenge.title[this.currentLanguageIndex];
    }
    return challenge.title;
  }

  getImagePath(index: number): string {
    return `assets/imgs/section1/pic${index + 1}.png`;
  }
}