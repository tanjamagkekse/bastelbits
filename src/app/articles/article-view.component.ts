import { CommonModule } from '@angular/common';
import { AfterContentInit, Component, Inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ArticleService } from './article.service';
import { IArticle } from './article';
import { CarouselModule } from '@coreui/angular';


@Component({
  selector: 'app-article-view',
  standalone: true,
  imports: [CommonModule, RouterModule, CarouselModule],
  templateUrl: './article-view.component.html',
  styleUrl: './article-view.component.css'
})


export class ArticleViewComponent implements OnInit {
  pageTitle = 'Article Detail';
  errorMessage = '';
  article: IArticle | undefined;
  currentImageIndex: number = 0;


  constructor(private route: ActivatedRoute,
              private articleService: ArticleService) {
  }

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (id) {
      this.getArticle(id);
    }
  }

  getArticle(id: number): void {
    this.articleService.getArticleById(id).subscribe({
      next: article => this.article = article,
      error: err => this.errorMessage = err
    });
  }


  nextImage(): void {
    if (this.article && this.article.images) {
      this.currentImageIndex = (this.currentImageIndex + 1) % this.article.images.length;
    }
  }
}
