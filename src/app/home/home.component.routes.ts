import { Routes } from '@angular/router';
import { ArticleViewComponent } from '../articles/article-view.component';
import { HomeComponent } from './home.component';


export const article_routes: Routes = [
    {
        path: '',
        component: HomeComponent
    },
    
    { 
      path: 'article-view/:id', 
      component: ArticleViewComponent,
      outlet: 'aux',
    },

  ];

export default article_routes;