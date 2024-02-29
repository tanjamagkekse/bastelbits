import { CommonModule } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ArticleService } from './article.service';
import { IArticle } from './article';

@Component({
  selector: 'app-article-view',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './article-view.component.html',
  styleUrl: './article-view.component.css'
})


export class ArticleViewComponent implements OnInit {
  pageTitle = 'Article Detail';
  errorMessage = '';
  article: IArticle | undefined;


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
}
