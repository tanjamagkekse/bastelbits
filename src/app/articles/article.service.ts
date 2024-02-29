import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, catchError, tap, throwError, map } from "rxjs";
import { IArticle } from "./article";

@Injectable({
  providedIn: 'root'
})

export class ArticleService {
    //TODO add server
    private articleUrl = 'assets/blog_articles.json';
  
    constructor(private http: HttpClient) { }
    
    getArticles(): Observable<IArticle[]> {
        return this.http.get<IArticle[]>(this.articleUrl)
        .pipe(
            tap(data => console.log('All: ', JSON.stringify(data))),
            catchError(this.handleError)
        );
    }

    // Get one article
    // Since we are working with a json file, we can only retrieve all articles
    // So retrieve all articles and then find the one we want using 'map'
    getArticleById(id: number): Observable<IArticle | undefined> {
        return this.getArticles()
        .pipe(
            map((articles: IArticle[]) => articles.find(a => a.articleId === id))
        );
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
