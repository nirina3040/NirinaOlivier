import { Routes } from '@angular/router';
import { HeroComponent } from './components/hero/hero.component';
import { AboutComponent } from './components/about/about.component';
import { ProjectsComponent } from './components/projects/projects.component';
import { ContactComponent } from './components/contact/contact.component';
import { NotFoundComponent } from './components/not-found/not-found.component';

export const routes: Routes = [
  { 
    path: '', 
    component: HeroComponent,
    data: { animation: 'hero' }
  },
  { 
    path: 'about', 
    component: AboutComponent,
    data: { animation: 'about' }
  },
  { 
    path: 'projects', 
    component: ProjectsComponent,
    data: { animation: 'projects' }
  },
  { 
    path: 'contact', 
    component: ContactComponent,
    data: { animation: 'contact' }
  },
  { 
    path: '404', 
    component: NotFoundComponent 
  },
  { 
    path: '**', 
    redirectTo: '404' 
  }
];