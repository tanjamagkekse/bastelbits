import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { SkillsComponent } from './skills/skills.component';
import { AboutComponent } from './about/about.component';
import { TimelineComponent } from './timeline/timeline.component';
import { ArticleViewComponent } from './articles/article-view.component';

export const routes: Routes = [

    { 
      path: '',
      redirectTo: 'home', 
      pathMatch: 'full' 
    },

    { 
      path: 'home', 
      loadChildren: () => import('./home/home.component.routes')
    },    

    { 
      path: 'skills', 
      component: SkillsComponent
    },

    { 
      path: 'about', 
      component: AboutComponent
    },

    { 
      path: 'timeline', 
      component: TimelineComponent
    },

    { 
      path: '**',
      redirectTo: 'home', 
      pathMatch: 'full' 
    },

    // TODO this _needs_ to be the last route!!
    // {
    //   path: '**',
    //   component: NotFoundComponent,
    // },
  ];