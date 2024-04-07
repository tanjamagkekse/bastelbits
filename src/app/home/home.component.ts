import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, HostListener, OnChanges, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { RouterModule } from '@angular/router';
import { IArticle } from '../articles/article';
import { ArticleService } from '../articles/article.service';
import { delay, map, Observable, shareReplay, Subscription, timer } from 'rxjs';
import { NgxMasonryComponent, NgxMasonryModule, NgxMasonryOptions } from 'ngx-masonry';
import { OverlayService } from './overlay.service';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { SearchService } from './search.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, NgxMasonryModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy{
  articleServiceSub!: Subscription;
  errorMessage = '';
  articles: IArticle[] = [];
  // twoRandomArticles: IArticle[] = [];
  filteredArticles: IArticle[] = [];
  lastArticle: IArticle | undefined;
  isScrolled: boolean = false;
  isOverlayOpen: boolean = false;
  searchResult: IArticle[] = [];
  isSearchOpen: boolean = false;
  searchQuery = '';

  @ViewChild(NgxMasonryComponent) masonry: NgxMasonryComponent | undefined;

  navigationItems = [
    { text: 'Alle Themen', filter: '', iconClass: 'bi bi-infinity' },
    { text: 'Malen', filter: 'Malen', iconClass: 'bi bi-brush' },
    { text: 'Holz', filter: 'Holz', iconClass: 'bi bi-tools' },
    { text: 'Einrichtung', filter: 'Einrichtung', iconClass: 'bi bi-house-heart' },
    { text: 'Licht', filter: 'Licht', iconClass: 'bi bi-lamp' },
    { text: 'Dies Das', filter: 'Dies Das', iconClass: 'bi bi-collection' },
  ];
	
  public masonryOptions: NgxMasonryOptions = {
		gutter: 10,
		resize: true,
		initLayout: true,
		fitWidth: true,
	};

  constructor(private articleService: ArticleService,
              private overlayService: OverlayService,
              private breakpointObserver: BreakpointObserver,
              private searchService: SearchService){}
  
  ngOnInit(): void {
    this.articleServiceSub = this.articleService.getArticles().subscribe({
      next: articles => {
        this.articles = articles.reverse();
        this.filteredArticles = this.articles;
        // this.lastArticle = this.articles[this.articles.length - 1];
        // this.twoRandomArticles = this.selectRandomArticles(articles, 2);
        this.searchService.setArticles(this.articles);

      },
      error: err => this.errorMessage = err
    });

    this.overlayService.overlayStatus$.subscribe(status => {
      this.isOverlayOpen = status;
    });
  }

  onSearch(query: string) {
    this.searchResult = this.searchService.search(query);
  }

  isSmallScreen$: Observable<boolean> = this.breakpointObserver.observe([Breakpoints.Small, Breakpoints.XSmall])
  .pipe(
    map(result => result.matches),
    shareReplay()
  );

  getFilteredArticles(filter: string) {
    if (filter==''){
      this.filteredArticles = this.articles
    }
    else{
      this.filteredArticles = this.articles
        .slice()
        .filter((article) => article.topic.includes(filter))
        .sort((a, b) => b.articleId - a.articleId);
    }
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.isScrolled = window.scrollY > 2;
  }

  ngOnDestroy(): void {
    this.articleServiceSub.unsubscribe();
  }

  search(query: string) {
    if (query.length >=3){
      const searchResults = this.searchService.search(query);
      this.displaySearchResult(searchResults);
    }
    if (query.length == 0){
      this.displaySearchResult(this.articles);
    }
  }

  openSearch() {
    this.isSearchOpen = !this.isSearchOpen;
    if (!this.isSearchOpen) {
      this.searchQuery = ''; 
    }
  }

  displaySearchResult(articles: IArticle[]){
    this.filteredArticles = articles
        .slice()
        .sort((a, b) => b.articleId - a.articleId);
  }

  // // Methode zum Zufälligauswählen von Artikeln
  // private selectRandomArticles(articles: IArticle[], count: number): IArticle[] {
  //     // Erstellen Sie eine Kopie des articles-Arrays
  //   const articlesCopy = [...articles];
    
  //   // Entfernen Sie den letzten Artikel aus der Kopie
  //   articlesCopy.pop();

  //   const shuffledArticles = this.shuffleArray(articlesCopy); // Permutation der Artikel
  //   return shuffledArticles.slice(0, count); // Auswahl der ersten zwei Artikel
  // }

  // // Methode zur Permutation eines Arrays (Fisher-Yates Algorithmus)
  // private shuffleArray(array: any[]): any[] {
  //   for (let i = array.length - 1; i > 0; i--) {
  //     const j = Math.floor(Math.random() * (i + 1));
  //     [array[i], array[j]] = [array[j], array[i]];
  //   }
  //   return array;
  // }

}
