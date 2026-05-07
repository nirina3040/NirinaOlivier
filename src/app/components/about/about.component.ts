import { Component, OnInit } from '@angular/core';
import { trigger, transition, style, animate, query, stagger } from '@angular/animations';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-about',
    standalone: true,  // ✅ AJOUTÉ
  imports: [CommonModule],  // ✅ AJOUTÉ
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
  animations: [
    trigger('fadeInUp', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(30px)' }),
        animate('0.6s ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
      ])
    ]),
    trigger('staggerFade', [
      transition('* => *', [
        query(':enter', [
          style({ opacity: 0, transform: 'translateY(20px)' }),
          stagger(100, [
            animate('0.5s ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
          ])
        ], { optional: true })
      ])
    ])
  ]
})
export class AboutComponent implements OnInit {
  experiences = [
    {
      period: '2026 - Présent',
      title: 'Développeur Full Stack Senior',
      company: 'Ecole Nationale d\'Informatique Fianarantsoa',
      description: 'Développement d\'applications web avec Angular et Node.js'
    },
    {
      period: '2025 - 2026',
      title: 'Stage Développement Web',
      company: 'CCI Haute Matsiatra',
      description: 'Développeé une application web gestion de Formation'
    },
    {
      period: '2024 - 2025',
      title: 'Stage Développement Web',
      company: 'DREAH',
      description: 'Développeé une application web gestion de Technique et Financier.'
    }
  ];

  education = [
    {
      period: '2026 - Présent',
      title: 'Master Développement Web',
      school: 'Ecole Nationale d\'Informatique Fianarantsoa',
      description: 'Spécialisation en architectures web modernes'
    },
    {
      period: '203 - 2025',
      title: 'Licence Informatique',
      school: 'Ecole Nationale d\'Informatique Fianarantsoa',
      description: 'Fondamentaux de l\'informatique et programmation'
    }
  ];

  constructor() { }

  ngOnInit(): void { }
}