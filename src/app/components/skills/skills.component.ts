import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';


interface Skill {
  name: string;
  level: number;
  icon: string;
  category: string;
}

@Component({
  selector: 'app-skills',
    standalone: true,  // ✅ AJOUTÉ
  imports: [CommonModule],  // ✅ AJOUTÉ
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.scss']
})
export class SkillsComponent implements OnInit {
  skillCategories = [
    { name: 'Frontend', icon: 'fas fa-code' },
    { name: 'Backend', icon: 'fas fa-server' },
    { name: 'Outils', icon: 'fas fa-tools' },
    { name: 'Soft Skills', icon: 'fas fa-star' }
  ];

  skills: { [category: string]: Skill[] } = {
    'Frontend': [
      { name: 'Angular', level: 95, icon: 'fab fa-angular', category: 'Frontend' },
      { name: 'React', level: 85, icon: 'fab fa-react', category: 'Frontend' },
      { name: 'TypeScript', level: 90, icon: 'fas fa-code', category: 'Frontend' },
      { name: 'HTML/CSS', level: 95, icon: 'fab fa-html5', category: 'Frontend' },
      { name: 'Sass/SCSS', level: 90, icon: 'fab fa-sass', category: 'Frontend' },
      { name: 'Vue.js', level: 70, icon: 'fab fa-vuejs', category: 'Frontend' }
    ],
    'Backend': [
      { name: 'Node.js', level: 90, icon: 'fab fa-node-js', category: 'Backend' },
      { name: 'Express', level: 88, icon: 'fas fa-server', category: 'Backend' },
      { name: 'MongoDB', level: 85, icon: 'fas fa-database', category: 'Backend' },
      { name: 'PostgreSQL', level: 75, icon: 'fas fa-database', category: 'Backend' },
      { name: 'Python', level: 70, icon: 'fab fa-python', category: 'Backend' }
    ],
    'Outils': [
      { name: 'Git', level: 92, icon: 'fab fa-git-alt', category: 'Outils' },
      { name: 'Docker', level: 78, icon: 'fab fa-docker', category: 'Outils' },
      { name: 'AWS', level: 65, icon: 'fab fa-aws', category: 'Outils' },
      { name: 'CI/CD', level: 70, icon: 'fas fa-sync-alt', category: 'Outils' },
      { name: 'VS Code', level: 95, icon: 'fas fa-code', category: 'Outils' }
    ],
    'Soft Skills': [
      { name: 'Communication', level: 90, icon: 'fas fa-comments', category: 'Soft Skills' },
      { name: 'Travail d\'équipe', level: 95, icon: 'fas fa-users', category: 'Soft Skills' },
      { name: 'Résolution de problèmes', level: 88, icon: 'fas fa-puzzle-piece', category: 'Soft Skills' },
      { name: 'Agile/Scrum', level: 85, icon: 'fas fa-tasks', category: 'Soft Skills' }
    ]
  };
  Math = Math;
  selectedCategory = 'Frontend';
  isAnimating = false;

  constructor() { }

  ngOnInit(): void { }

  selectCategory(category: string) {
    if (this.selectedCategory !== category) {
      this.isAnimating = true;
      this.selectedCategory = category;
      setTimeout(() => this.isAnimating = false, 500);
    }
  }

  get selectedSkills(): Skill[] {
    return this.skills[this.selectedCategory] || [];
  }

  getProgressColor(level: number): string {
    if (level >= 90) return '#4caf50';
    if (level >= 75) return '#667eea';
    if (level >= 60) return '#ff9800';
    return '#f44336';
  }

  getSkillCategories(): string[] {
    return Object.keys(this.skills);
  }

  getTotalSkills(): number {
  let total = 0;
  Object.values(this.skills).forEach(arr => total += arr.length);
  return total;
}

getAverageLevel(): number {
  let total = 0;
  let count = 0;
  Object.values(this.skills).forEach(arr => {
    arr.forEach(skill => {
      total += skill.level;
      count++;
    });
  });
  return Math.round(total / count);
}

}