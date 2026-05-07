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
      imageUrl: 'assets/logo.jpg',  // ✅ Image locale
      technologies: ['Angular'],
      githubUrl: 'https://github.com/nirina3040/portfolio',
      liveUrl: 'https://www.youtube.com/watch?v=votre-video',
      featured: true,
      createdAt: new Date('2024-01-15')
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
      title: 'E-commerce App',
      description: 'Application e-commerce avec panier, paiement et gestion des commandes.',
      imageUrl: 'assets/logo.jpg',  // ✅ Image locale
      technologies: ['Angular', 'Node.js'],
      githubUrl: 'https://github.com/nirina3040/ecommerce',
      liveUrl: 'https://www.youtube.com/watch?v=votre-video',
      featured: true,
      createdAt: new Date('2024-04-05')
    },
    {
      _id: '5',
      title: 'Chat Application',
      description: 'Application de chat en temps réel avec Socket.io.',
      imageUrl: 'assets/logo.jpg',  // ✅ Image locale
      technologies: ['Angular', 'Express'],
      githubUrl: 'https://github.com/nirina3040/chat-app',
      liveUrl: 'https://www.youtube.com/watch?v=votre-video',
      featured: false,
      createdAt: new Date('2024-05-15')
    },
    {
      _id: '6',
      title: 'Dashboard Admin',
      description: 'Tableau de bord administrateur avec graphiques et statistiques.',
      imageUrl: 'assets/logo.jpg',  // ✅ Image locale
      technologies: ['Angular', 'Python'],
      githubUrl: 'https://github.com/nirina3040/dashboard',
      liveUrl: 'https://www.youtube.com/watch?v=votre-video',
      featured: false,
      createdAt: new Date('2024-06-20')
    }
  ];
}
}