import { Component, OnInit } from '@angular/core';
import { LanguageService } from '../../../../core/services/language.service';
import { sectionHeadingsMocks } from '../../../../core/mocks/sections/sectionheadings';
import { section2Mocks } from '../../../../core/mocks/sections/section2mock';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-section2',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './section2.component.html',
  styleUrls: ['./section2.component.scss'],
})
export class section2Component implements OnInit {
  heading = sectionHeadingsMocks[2]; // Second heading is for section2
  challenges = section2Mocks;
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

  getChallengeTitle(challenge: any): string {
    if (Array.isArray(challenge.title)) {
      return challenge.title[this.currentLanguageIndex];
    }
    return challenge.title;
  }

  getImagePath(index: number): string {
    return `assets/imgs/section2/pic${index + 1}.png`;
  }
}
