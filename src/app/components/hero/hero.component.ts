import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.scss'],
  animations: [
    trigger('fadeInUp', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(50px)' }),
        animate('0.8s ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
      ])
    ]),
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('1.5s ease-out', style({ opacity: 1 }))
      ])
    ])
  ]
})
export class HeroComponent implements OnInit {
  roles = ['Étudiant Développeur', 'En Formation Angular', 'Futur Full Stack'];
  currentRole = '';
  currentIndex = 0;

  ngOnInit() {
    this.typeRole();
  }

  typeRole() {
    const role = this.roles[this.currentIndex];
    let charIndex = 0;
    
    const typeInterval = setInterval(() => {
      if (charIndex <= role.length) {
        this.currentRole = role.substring(0, charIndex);
        charIndex++;
      } else {
        clearInterval(typeInterval);
        setTimeout(() => this.eraseRole(), 2000);
      }
    }, 100);
  }

  eraseRole() {
    const eraseInterval = setInterval(() => {
      if (this.currentRole.length > 0) {
        this.currentRole = this.currentRole.substring(0, this.currentRole.length - 1);
      } else {
        clearInterval(eraseInterval);
        this.currentIndex = (this.currentIndex + 1) % this.roles.length;
        this.typeRole();
      }
    }, 50);
  }
}