import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {
  private currentLanguageSubject = new BehaviorSubject<number>(0); // 0: English, 1: Russian, 2: Georgian
  currentLanguage$ = this.currentLanguageSubject.asObservable();

  private languages = ['ENG', 'РУС', 'GEO'];

  constructor() { }

  getCurrentLanguage(): number {
    return this.currentLanguageSubject.value;
  }

  setLanguage(index: number): void {
    this.currentLanguageSubject.next(index);
  }

  getLanguageText(index: number): string {
    return this.languages[index];
  }

  getNextLanguage(): number {
    return (this.currentLanguageSubject.value + 1) % this.languages.length;
  }
}