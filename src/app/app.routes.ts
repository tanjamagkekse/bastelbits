import { Routes } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { ReleaseNotesComponent } from './release-notes/release-notes.component';
import { SkillsComponent } from './skills/skills.component';

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
      path: 'release-notes', 
      component: ReleaseNotesComponent
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