import { Component, EventEmitter, Input, Output } from '@angular/core';
import { RequestModelMocks } from '../../../core/mocks/requestmodelmock';
import { LanguageService } from '../../../core/services/language.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-request-modal',
  imports: [FormsModule,CommonModule], // Add any necessary imports here
  standalone: true,
  templateUrl: './request-modal.component.html',
  styleUrls: ['./request-modal.component.scss']
})
export class RequestModalComponent {
  @Input() visible = false;
  @Output() visibleChange = new EventEmitter<boolean>();
  contactData = RequestModelMocks;
  formData: any = {};

  constructor(private languageService: LanguageService) {}

  getCurrentLanguageIndex(): number {
    return this.languageService.getCurrentLanguage();
  }

  getText(item: any): string {
    return item.title[this.getCurrentLanguageIndex()];
  }

  closeModal(): void {
    this.visible = false;
    this.visibleChange.emit(false);
  }

  onSubmit(): void {
    console.log('Form submitted:', this.formData);
    this.closeModal();
    // Here you would normally send data to backend
  }
}