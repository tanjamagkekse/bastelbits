import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { ArticleService } from './article.service';
import { IArticle } from './article';
import { HttpClient } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { OverlayService } from '../home/overlay.service';
import { CarouselComponent } from "../carousel/carousel.component";


@Component({
    selector: 'app-article-view',
    standalone: true,
    templateUrl: './article-view.component.html',
    styleUrl: './article-view.component.css',
    imports: [CommonModule, RouterModule, CarouselComponent]
})


export class ArticleViewComponent implements OnInit, OnDestroy {
  errorMessage = '';
  article: IArticle | undefined; 
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



  ngOnDestroy(): void {
    if (this.articleSubscription) {
      this.articleSubscription.unsubscribe();
    }
    this.overlayService.setOverlayStatus(false);
  }

}
