import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { SkillsComponent } from './skills/skills.component';
import { AboutComponent } from './about/about.component';
import { TimelineComponent } from './timeline/timeline.component';

export const routes: Routes = [
    { path: 'home', component: HomeComponent },
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    
    { path: 'skills', component: SkillsComponent},
    { path: 'about', component: AboutComponent},
    { path: 'timeline', component: TimelineComponent},


    { path: '**', redirectTo: 'home', pathMatch: 'full' },
  ];