import { Injectable } from '@angular/core';
import { IArticle } from '../articles/article';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
    private articles: IArticle[] = []; // Hier Ihre Artikel speichern

    constructor() { }

    setArticles(articles: IArticle[]) {
        this.articles = articles;
    }

    search(query: string): IArticle[] {
        return this.articles.filter(article => article.title.toLowerCase().includes(query.toLowerCase()));
    }
}