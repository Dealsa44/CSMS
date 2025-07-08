import { Component, OnInit } from '@angular/core';
import { LanguageService } from '../../../core/services/language.service';
import { sectionHeadingsMocks } from '../../../core/mocks/sections/sectionheadings'; // Keep this for main heading
import { mainMocks } from '../../../core/mocks/sections/mainmocks'; // Import the new subheading mock

@Component({
  selector: 'app-main',
  standalone: true,
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  heading = sectionHeadingsMocks.find(mock => mock.order === 0); // Find the main heading
  subheading = mainMocks; // Use the imported subheading mock directly
  currentLanguageIndex = 0;

  constructor(private languageService: LanguageService) {}

  ngOnInit(): void {
    this.languageService.currentLanguage$.subscribe(index => {
      this.currentLanguageIndex = index;
    });
  }

  getHeading(): string {
    return this.heading ? this.heading.title[this.currentLanguageIndex] : '';
  }

  getSubheading(): string {
    return this.subheading ? this.subheading.title[this.currentLanguageIndex] : '';
  }
}