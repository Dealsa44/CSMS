import { Component, OnInit } from '@angular/core';
import { LanguageService } from '../../../core/services/language.service';
import { sectionHeadingsMocks } from '../../../core/mocks/sections/sectionheadings';

@Component({
  selector: 'app-main',
  standalone: true,
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  heading = sectionHeadingsMocks[0]; // First heading is for main
  currentLanguageIndex = 0;

  constructor(private languageService: LanguageService) {}

  ngOnInit(): void {
    this.languageService.currentLanguage$.subscribe(index => {
      this.currentLanguageIndex = index;
    });
  }

  getHeading(): string {
    return this.heading.title[this.currentLanguageIndex];
  }
}