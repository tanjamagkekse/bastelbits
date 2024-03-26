import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CarouselModule } from '@coreui/angular';
import { IArticle } from '../articles/article';


@Component({
  selector: 'app-carousel',
  standalone: true,
  imports: [CarouselModule, CommonModule, RouterModule],
  templateUrl: './carousel.component.html',
  styleUrl: './carousel.component.css'
})
export class CarouselComponent {
  currentImageIndex: number = 0;
  @Input() article: IArticle | undefined; 

    //used by carousel to get the nextImage of the array
    nextImage(): void {
      if (this.article && this.article.images) {
        this.currentImageIndex = (this.currentImageIndex + 1) % this.article.images.length;
      }
    }
}
