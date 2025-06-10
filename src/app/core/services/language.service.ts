import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LanguageService {
  private readonly STORAGE_KEY = 'selectedLanguageIndex';

  private currentLanguageIndex = this.getSavedLanguageIndex();
  public currentLanguage$ = new BehaviorSubject<number>(this.currentLanguageIndex);

  constructor() {}

  private getSavedLanguageIndex(): number {
    const saved = localStorage.getItem(this.STORAGE_KEY);
    return saved !== null ? +saved : 0; // default to 0 if not found
  }

  getCurrentLanguage(): number {
    return this.currentLanguageIndex;
  }

  setLanguage(index: number): void {
    this.currentLanguageIndex = index;
    localStorage.setItem(this.STORAGE_KEY, index.toString());
    this.currentLanguage$.next(index);
  }

  getNextLanguage(): number {
    const nextIndex = (this.currentLanguageIndex + 1) % 3;
    this.setLanguage(nextIndex);
    return nextIndex;
  }
}
