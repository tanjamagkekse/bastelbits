import { Routes } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { ReleaseNotesComponent } from './release-notes/release-notes.component';
import { SkillsComponent } from './skills/skills.component';
import { ContactFormComponent } from './contact-form/contact-form.component';
import { DatenschutzComponent } from './footer/datenschutz.component';
import { ImpressumComponent } from './footer/impressum.component';

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
      path: 'contact', 
      component: ContactFormComponent
    },
    { 
      path: 'impressum', 
      component: ImpressumComponent
    },
    { 
      path: 'datenschutz', 
      component: DatenschutzComponent
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