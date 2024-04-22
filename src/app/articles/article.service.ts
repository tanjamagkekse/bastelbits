import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, throwError, of, map} from "rxjs";
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
  // Since we are working with a json file, we can only retrieve all articles
  // So retrieve all articles and then find the one we want using 'map'
  getArticleById(id: number): Observable<IArticle | undefined> {
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


  private handleError(err: HttpErrorResponse): Observable<never> {
    // in a real world app, we may send the server to some remote logging infrastructure
    // instead of just logging it to the console
    let errorMessage = '';
    if (err.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      errorMessage = `An error occurred: ${err.error.message}`;
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      errorMessage = `Server returned code: ${err.status}, error message is: ${err.message}`;
    }
    console.error(errorMessage);
    return throwError(() => errorMessage);
  }

}


