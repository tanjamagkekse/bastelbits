import { CommonModule } from '@angular/common';
import { AfterContentInit, Component, ElementRef, HostListener, OnDestroy, OnInit, Renderer2, computed, signal } from '@angular/core';
import { RouterModule } from '@angular/router';
import { IArticle } from '../articles/article';
import { ArticleService } from '../articles/article.service';
import { Subscription } from 'rxjs';
import { NgxMasonryModule, NgxMasonryOptions } from 'ngx-masonry';
import { OverlayService } from './overlay.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule, NgxMasonryModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy{
  articleServiceSub!: Subscription;
  errorMessage = '';
  articles: IArticle[] = [];
  twoRandomArticles: IArticle[] = [];
  lastArticle: IArticle | undefined;
  isScrolled: boolean = false;
  filter: string = '';
  isOverlayOpen: boolean = false;
	
  public masonryOptions: NgxMasonryOptions = {
		gutter: 10,
		resize: true,
		initLayout: true,
		fitWidth: true
	};

  constructor(private articleService: ArticleService,
              private overlayService: OverlayService){}
  
  ngOnInit(): void {
    this.articleServiceSub = this.articleService.getArticles().subscribe({
      next: articles => {
        this.articles = articles.reverse();
        // this.lastArticle = this.articles[this.articles.length - 1];
        // this.twoRandomArticles = this.selectRandomArticles(articles, 2);
      },
      error: err => this.errorMessage = err
    });
    this.overlayService.overlayStatus$.subscribe(status => {
      this.isOverlayOpen = status;
    });
  }

  ngOnDestroy(): void {
    this.articleServiceSub.unsubscribe();
  }


  // Methode zum Zufälligauswählen von Artikeln
  private selectRandomArticles(articles: IArticle[], count: number): IArticle[] {
      // Erstellen Sie eine Kopie des articles-Arrays
    const articlesCopy = [...articles];
    
    // Entfernen Sie den letzten Artikel aus der Kopie
    articlesCopy.pop();

    const shuffledArticles = this.shuffleArray(articlesCopy); // Permutation der Artikel
    return shuffledArticles.slice(0, count); // Auswahl der ersten zwei Artikel
  }

  // Methode zur Permutation eines Arrays (Fisher-Yates Algorithmus)
  private shuffleArray(array: any[]): any[] {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  getFilteredArticles() {
    return this.filter === ''
      ? this.articles.slice().sort((a, b) => b.articleId - a.articleId)
      : this.articles
          .filter((article) => article.topic == this.filter)
          .slice()
          .sort((a, b) => b.articleId - a.articleId);
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.isScrolled = window.scrollY > 2;
  }
}
