import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { LanguageService } from '../../../../core/services/language.service';
import { sectionHeadingsMocks } from '../../../../core/mocks/sections/sectionheadings';
import { section2Mocks } from '../../../../core/mocks/sections/section2mock';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { ImageModalComponent } from '../../image-modal/image-modal.component';

@Component({
  selector: 'app-section2',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './section2.component.html',
  styleUrls: ['./section2.component.scss'],
})
export class section2Component implements OnInit {
  @Output() requestModalTrigger = new EventEmitter<void>();
  heading = sectionHeadingsMocks[2]; // Third heading is for section2
  titles = section2Mocks[0];
  contents = section2Mocks[1];
  currentLanguageIndex = 0;
  activeIndex = -1;
  expandedItems: boolean[] = [];

  // New properties for smooth image transitions
  imageLoading = false;
  imageChanging = false;
  currentImageSrc = '';

  constructor(
    private languageService: LanguageService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.languageService.currentLanguage$.subscribe((index) => {
      this.currentLanguageIndex = index;
    });
    // Initialize all items as collapsed
    this.expandedItems = new Array(this.titles.length).fill(false);

    // Set initial image
    this.currentImageSrc = this.getImagePath();

    // Preload all images for better performance
    this.preloadImages();
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

  // Enhanced toggleItem method with smooth image transition
  toggleItem(index: number): void {
    // Store the previous activeIndex to determine if image should change
    const previousActiveIndex = this.activeIndex;

    // If clicking the currently active item, just toggle its expanded state
    if (this.activeIndex === index) {
      this.expandedItems[index] = !this.expandedItems[index];
      // If collapsing, set activeIndex to -1 and handle image transition
      if (!this.expandedItems[index]) {
        this.handleImageTransition(-1, previousActiveIndex);
        this.activeIndex = -1;
      }
    } else {
      // Set all items to collapsed
      this.expandedItems.fill(false);
      // Set the clicked item as active and expanded
      this.activeIndex = index;
      this.expandedItems[index] = true;
      // Handle image transition to new index
      this.handleImageTransition(index, previousActiveIndex);
    }
  }

  // New method to handle smooth image transitions
  private handleImageTransition(newIndex: number, previousIndex: number): void {
    const newImageSrc = this.getImagePathByIndex(newIndex);

    // Don't transition if it's the same image
    if (this.currentImageSrc === newImageSrc) {
      return;
    }

    // Start transition animation
    this.imageChanging = true;
    this.imageLoading = true;

    // Preload the new image for smoother transition
    const img = new Image();
    img.onload = () => {
      // Small delay to ensure smooth animation
      setTimeout(() => {
        this.currentImageSrc = newImageSrc;
        this.imageLoading = false;

        // End transition animation after image loads
        setTimeout(() => {
          this.imageChanging = false;
        }, 100);
      }, 150);
    };

    img.onerror = () => {
      // Handle error case - still update but without smooth transition
      console.warn(`Failed to load image: ${newImageSrc}`);
      this.imageLoading = false;
      this.imageChanging = false;
      this.currentImageSrc = newImageSrc; // Still update even on error
    };

    img.src = newImageSrc;
  }

  // Helper method to get image path by index (used internally for transitions)
  private getImagePathByIndex(index: number): string {
    if (index === -1) {
      return 'assets/imgs/section2/pic8.png'; // Default image when nothing is selected
    }
    return `assets/imgs/section2/pic${index + 1}.png`;
  }

  // Original getImagePath method (keeping for compatibility)
  getImagePath(): string {
    if (this.activeIndex === -1) {
      return 'assets/imgs/section2/pic8.png'; // Default image when nothing is selected
    }
    return `assets/imgs/section2/pic${this.activeIndex + 1}.png`;
  }

  // Optional: Preload all images for instant transitions
  private preloadImages(): void {
    // Preload default image
    const defaultImg = new Image();
    defaultImg.src = 'assets/imgs/section2/pic8.png';

    // Preload all section images
    this.titles.forEach((_, index) => {
      const img = new Image();
      img.src = `assets/imgs/section2/pic${index + 1}.png`;
    });
  }

  onLearnMore(): void {
    this.requestModalTrigger.emit();
  }
  openImageModal(): void {
    if (!this.currentImageSrc) return;

    this.dialog.open(ImageModalComponent, {
      data: {
        imageSrc: this.currentImageSrc,
        imageAlt:
          this.activeIndex >= 0
            ? this.getTitle(this.titles[this.activeIndex])
            : 'Default image',
      },
      panelClass: 'image-modal',
      maxWidth: '90vw',
      maxHeight: '90vh',
    });
  }
}
