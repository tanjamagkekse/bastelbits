import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, of, map} from "rxjs";
import { IArticle } from "./article";


@Injectable({
  providedIn: 'root'
})

export class ArticleService {
  private articleUrl = 'https://bastelbits.de/articles.php'; 
  //private articleUrl = 'assets/blog_articles.json';
  private articles: IArticle[] = [];

  constructor(private http: HttpClient) { }
  
  getArticles(): Observable<IArticle[]> {
      return this.http.get<IArticle[]>(this.articleUrl);
  }

  setArticles(articles: IArticle[]){
    this.articles = articles;
  } 

  // Get one article
  // retrieve all articles and then find the one we want using 'map'
  getArticleById(id: number): Observable<IArticle | undefined> {
    //if this.articles is not yet set - load articles from url
    if (this.articles.length === 0) {
      return this.getArticles()
      .pipe(
          map((articles: IArticle[]) => articles.find(a => a.articleId === id))
      );
    } 
    else{
      const foundArticle = this.articles.find(a => a.articleId === id);
      return of(foundArticle);
    }
  }

}


