import { Component, EventEmitter, OnInit, Output, ChangeDetectionStrategy, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { LanguageService } from '../../../../core/services/language.service';
import { sectionHeadingsMocks } from '../../../../core/mocks/sections/sectionheadings';
import { section3Mocks } from '../../../../core/mocks/sections/section3mock';
import { CommonModule } from '@angular/common';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-section3',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './section3.component.html',
  styleUrls: ['./section3.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class section3Component implements OnInit, OnDestroy {
  @Output() requestModalTrigger = new EventEmitter<void>();
  
  heading = sectionHeadingsMocks[3];
  items = section3Mocks[0];
  contents = section3Mocks[1];
  currentLanguageIndex = 0;
  activeItemIndex = 0;
  
  // Cache for preloaded content
  private imageCache: Map<number, HTMLImageElement> = new Map();
  private contentCache: Map<number, any> = new Map();
  private imagesPreloaded = false;
  private destroy$ = new Subject<void>();
  
  // Loading state
  isLoading = false;
  
  constructor(
    private languageService: LanguageService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.languageService.currentLanguage$
      .pipe(takeUntil(this.destroy$))
      .subscribe(index => {
        this.currentLanguageIndex = index;
        this.preloadContent(); // Preload content when language changes
        this.cdr.markForCheck();
      });
    
    // Start preloading immediately
    this.preloadAllContent();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
    this.imageCache.clear();
    this.contentCache.clear();
  }

  private preloadAllContent(): void {
    // Preload all images and content immediately
    this.preloadImages();
    this.preloadContent();
  }

  private preloadImages(): void {
    const totalImages = this.items.length;
    let loadedCount = 0;

    for (let i = 0; i < totalImages; i++) {
      if (this.imageCache.has(i)) {
        loadedCount++;
        continue;
      }

      const img = new Image();
      
      // Set loading attributes for better performance
      img.loading = 'eager';
      img.decoding = 'async';
      
      img.onload = () => {
        this.imageCache.set(i, img);
        loadedCount++;
        
        if (loadedCount === totalImages) {
          this.imagesPreloaded = true;
          this.cdr.markForCheck();
        }
      };
      
      img.onerror = () => {
        console.warn(`Failed to preload image ${i + 1}`);
        loadedCount++;
        
        if (loadedCount === totalImages) {
          this.imagesPreloaded = true;
          this.cdr.markForCheck();
        }
      };
      
      // Use higher priority for first few images
      if (i < 3) {
        img.fetchPriority = 'high';
      }
      
      img.src = `assets/imgs/section3/pic${i + 1}.jpg`;
    }
  }

  private preloadContent(): void {
    // Pre-process all content to avoid computation during switching
    for (let i = 0; i < this.contents.length; i++) {
      const content = {
        title: this.contents[i].title[this.currentLanguageIndex],
        link: this.contents[i].link[this.currentLanguageIndex]
      };
      this.contentCache.set(i, content);
    }
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

  // Optimized content getters using cache
  getActiveContent(): string {
    const cached = this.contentCache.get(this.activeItemIndex);
    return cached ? cached.title : this.contents[this.activeItemIndex]?.title[this.currentLanguageIndex] || '';
  }

  getActiveLinkText(): string {
    const cached = this.contentCache.get(this.activeItemIndex);
    return cached ? cached.link : this.contents[this.activeItemIndex]?.link[this.currentLanguageIndex] || '';
  }

  setActiveItem(index: number): void {
    if (this.activeItemIndex === index || this.isLoading) {
      return;
    }

    // Use requestAnimationFrame for smoother transitions
    requestAnimationFrame(() => {
      this.activeItemIndex = index;
      
      // Trigger immediate change detection
      this.cdr.detectChanges();
      
      // Preload next/previous images for even smoother navigation
      this.preloadAdjacentImages(index);
    });
  }

  private preloadAdjacentImages(currentIndex: number): void {
    const nextIndex = (currentIndex + 1) % this.items.length;
    const prevIndex = (currentIndex - 1 + this.items.length) % this.items.length;
    
    [nextIndex, prevIndex].forEach(idx => {
      if (!this.imageCache.has(idx)) {
        const img = new Image();
        img.loading = 'eager';
        img.onload = () => this.imageCache.set(idx, img);
        img.src = `assets/imgs/section3/pic${idx + 1}.jpg`;
      }
    });
  }

  getImagePath(): string {
    return `assets/imgs/section3/pic${this.activeItemIndex + 1}.jpg`;
  }

  isImageReady(index: number): boolean {
    const img = this.imageCache.get(index);
    return img ? img.complete && img.naturalHeight !== 0 : false;
  }

  isCurrentImageReady(): boolean {
    return this.isImageReady(this.activeItemIndex);
  }

  onLearnMore(): void {
    this.requestModalTrigger.emit();
  }

  trackByIndex(index: number): number {
    return index;
  }

  // Method to get all images for template preloading
  getAllImagePaths(): string[] {
    return this.items.map((_, index) => `assets/imgs/section3/pic${index + 1}.jpg`);
  }
}