import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectService, Project } from '../../services/project.service';
import { ProjectCardComponent } from '../project-card/project-card.component';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule, ProjectCardComponent],
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent implements OnInit {
  projects: Project[] = [];
  categories: string[] = ['Tous'];
  selectedCategory = 'Tous';
  isLoading = true;
  errorMessage = '';

  constructor(private projectService: ProjectService) { }

  ngOnInit(): void {
    this.loadProjects();
  }

  loadProjects(): void {
    this.isLoading = true;
    this.errorMessage = '';

    this.projectService.getProjects().subscribe({
      next: (data) => {
        if (data && data.length > 0) {
          // ✅ Données de l'API
          this.projects = data;
          console.log('✅ Projets chargés depuis l\'API:', data.length);
        } else {
          // ⚠️ API vide, utiliser les données mock
          this.projects = this.getMockProjects();
          console.log('⚠️ API vide, utilisation des données mock');
        }
        this.extractCategories();
        this.isLoading = false;
      },
      error: (error) => {
        // ❌ Erreur, utiliser les données mock
        console.log('❌ Erreur API, utilisation des données mock');
        this.projects = this.getMockProjects();
        this.extractCategories();
        this.isLoading = false;
      }
    });
  }

  // Extraire les catégories uniques des technologies
  extractCategories(): void {
    const allTechs = this.projects.flatMap(p => p.technologies);
    const uniqueCategories = ['Tous', ...new Set(allTechs.map(tech => 
      tech.split(' ')[0] // Prend le premier mot comme catégorie
    ))];
    this.categories = uniqueCategories.slice(0, 10); // Limiter à 10
  }

  filterProjects(category: string): void {
    this.selectedCategory = category;
  }

  get filteredProjects(): Project[] {
    if (this.selectedCategory === 'Tous') {
      return this.projects;
    }
    return this.projects.filter(p =>
      p.technologies.some(tech =>
        tech.toLowerCase().includes(this.selectedCategory.toLowerCase())
      )
    );
  }

  trackByProjectId(index: number, project: Project): string {
    return project._id || index.toString();
  }

  private getMockProjects(): Project[] {
  return [
    {
      _id: '1',
      title: 'Portfolio Personnel',
      description: 'Site portfolio créé avec Angular pour présenter mes projets et compétences.',
      imageUrl: 'assets/porfolio.png',
      technologies: ['Angular'],
      githubUrl: 'https://github.com/nirina3040/NirinaOlivier',
      liveUrl: 'https://youtu.be/8NUI1O6kbwY',
      featured: true,
      createdAt: new Date('2026-05-10')
    },
    {
      _id: '2',
      title: 'Application ToDo',
      description: 'Application de gestion de tâches avec système de catégories et priorités.',
      imageUrl: 'assets/logo.jpg',  // ✅ Image locale
      technologies: ['React', 'Node.js', 'PostgreSQL'],
      githubUrl: 'https://github.com/nirina3040/todo-app',
      liveUrl: 'https://www.youtube.com/watch?v=votre-video',
      featured: false,
      createdAt: new Date('2024-02-20')
    },
    {
      _id: '3',
      title: 'API Météo',
      description: 'Application météo consommant une API REST avec géolocalisation.',
      imageUrl: 'assets/logo.jpg',  // ✅ Image locale
      technologies: ['Angular'],
      githubUrl: 'https://github.com/nirina3040/weather-app',
      liveUrl: 'https://www.youtube.com/watch?v=votre-video',
      featured: false,
      createdAt: new Date('2024-03-10')
    },
    {
      _id: '4',
      title: 'Application Ford Algorithm',
      description: 'Outil web de recherche opérationnelle pour calculer et visualiser les chemins critiques dans un graphe de tâches via l\'algorithme de FORD',
      imageUrl: 'assets/ford.png', 
      technologies: ['Angular', 'Node.js'],
      githubUrl: 'https://github.com/nirina3040/FORD_MAX_MIN',
      liveUrl: 'https://youtu.be/og8jEWxqr4k',
      featured: true,
      createdAt: new Date('2024-04-05')
    },
    {
      _id: '5',
      title: 'Gestion de vokatra',
      description: 'Développement d\'une application web de gestion intégrée des ventes, collectes et paiements pour une église, permettant aux administrateurs, secrétaires, caissiers et collecteurs mobiles de gérer les activités, produits, transactions et dettes via des interfaces dédiées sur PC et mobile.',
      imageUrl: 'assets/vokatra.png',
      technologies: ['Angular', 'Express', 'PostgreSQL'],
      githubUrl: 'https://github.com/nirina3040/',
      liveUrl: 'https://www.youtube.com/watch?v=votre-video',
      featured: false,
      createdAt: new Date('2024-05-15')
    },
    {
      _id: '6',
      title: 'Motivation Education Prediction',
      description: 'Motivation Education Prediction est une application intelligente conçue pour aider les utilisateurs à améliorer leur motivation, leur apprentissage et leur prise de décision grâce à l’analyse des données et à l’intelligence artificielle',
      imageUrl: 'assets/apex.png',
      technologies: ['Flutter', 'Python'],
      githubUrl: 'https://github.com/RNO-Nirina-Olivier',
      liveUrl: 'https://youtu.be/bRSKyGKnd5A',
      featured: false,
      createdAt: new Date('2026-05-10')
    }
  ];
}
}