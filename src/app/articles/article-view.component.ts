import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { ArticleService } from './article.service';
import { IArticle } from './article';
import { CarouselModule } from '@coreui/angular';
import { HttpClient } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { OverlayService } from '../home/overlay.service';


@Component({
  selector: 'app-article-view',
  standalone: true,
  imports: [CommonModule, RouterModule, CarouselModule],
  templateUrl: './article-view.component.html',
  styleUrl: './article-view.component.css'
})


export class ArticleViewComponent implements OnInit, OnDestroy {
  pageTitle = 'Article Detail';
  errorMessage = '';
  article: IArticle | undefined; 
  currentImageIndex: number = 0;
  private articleSubscription: Subscription | undefined;


  constructor(private route: ActivatedRoute,
              private articleService: ArticleService,
              private http: HttpClient,
              private overlayService: OverlayService) {
  }

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (id) {
      this.getArticle(id);
    }
    this.overlayService.setOverlayStatus(true);
  }

  // getArticle(id: number): void {
  //   this.articleService.getArticleById(id).subscribe({
  //     next: article => this.article = article,
  //     error: err => this.errorMessage = err
  //   });
  // }

  getArticle(id: number): void {
    this.articleSubscription = this.articleService.getArticleById(id).subscribe({
      next: article => {
        // if 'content'-key in json is a path to a html
        if (article?.content && typeof article?.content === 'string' && article?.content.startsWith('assets')) {
          // check the html content
          this.http.get(article.content, { responseType: 'text' }).subscribe(htmlContent => {
            // and use it as article
            this.article = { ...article, content: htmlContent };
          });
        } else {
          this.article = article;
        }
      },
      error: err => this.errorMessage = err
    });
  }

  //used by carousel to get the nextImage of the array
  nextImage(): void {
    if (this.article && this.article.images) {
      this.currentImageIndex = (this.currentImageIndex + 1) % this.article.images.length;
    }
  }

  ngOnDestroy(): void {
    if (this.articleSubscription) {
      this.articleSubscription.unsubscribe();
    }
    this.overlayService.setOverlayStatus(false);
  }

}
