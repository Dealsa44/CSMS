import { Component, OnInit } from '@angular/core';
import { LanguageService } from '../../../../core/services/language.service';
import { sectionHeadingsMocks } from '../../../../core/mocks/sections/sectionheadings';
import { section4Mocks } from '../../../../core/mocks/sections/section4mock';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-section4',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './section4.component.html',
  styleUrls: ['./section4.component.scss']
})
export class Section4Component implements OnInit {
  heading = sectionHeadingsMocks[4]; // Contact heading
  content = section4Mocks;
  currentLanguageIndex = 0;
  phoneNumber = '+995';

  constructor(private languageService: LanguageService) {}

  ngOnInit(): void {
    this.languageService.currentLanguage$.subscribe(index => {
      this.currentLanguageIndex = index;
    });
  }

  getText(item: any): string {
    return item.title[this.currentLanguageIndex];
  }

  onSubmit(): void {
    console.log('Phone number submitted:', this.phoneNumber);
    this.phoneNumber= '+995'; // Reset the phone number after submission
    // Here you would normally send the data to your backend
  }
}