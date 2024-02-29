import { CommonModule } from '@angular/common';
import { Component, computed, signal } from '@angular/core';
import { RouterModule } from '@angular/router';
import { IArticle } from '../articles/article';
import { ArticleService } from '../articles/article.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  sub!: Subscription;
  errorMessage = '';
  articles: IArticle[] = [];
  
  constructor(private articleService: ArticleService) {}
  
  ngOnInit(): void {
    this.sub = this.articleService.getArticles().subscribe({
      next: articles => {
        this.articles = articles;
      },
      error: err => this.errorMessage = err
    });
  }
  
  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
