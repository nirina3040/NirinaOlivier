import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ContactService } from '../../services/contact.service';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [
    CommonModule, 
    ReactiveFormsModule
  ],
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
  animations: [
    trigger('fadeInUp', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(30px)' }),
        animate('0.6s ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
      ])
    ]),
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('0.5s ease-out', style({ opacity: 1 }))
      ])
    ])
  ]
})
export class ContactComponent implements OnInit {
  contactForm!: FormGroup;
  isSubmitting = false;
  submitted = false;
  errorMessage = '';

  contactInfo = [
    { icon: 'fas fa-envelope', label: 'Email', value: 'nirinaolivier9@gmail.com', link: 'mailto:nirinaolivier9@gmail.com' },
    { icon: 'fas fa-phone', label: 'Téléphone', value: '+261 34 24 703 37', link: 'tel:+261342470337' },
    { icon: 'fas fa-map-marker-alt', label: 'Localisation', value: 'Manaotsara II, Fianarantsoa', link: '#' },
    { icon: 'fab fa-linkedin', label: 'LinkedIn', value: 'linkedin.com/in/nirinaolivier', link: 'https://linkedin.com/in/nirinaolivier' },
    { icon: 'fab fa-github', label: 'GitHub', value: 'github.com/nirina3040', link: 'https://github.com/nirina3040' }
  ];

  constructor(
    private fb: FormBuilder,
    private contactService: ContactService
  ) { }

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.contactForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      subject: ['', Validators.required],
      message: ['', [Validators.required, Validators.minLength(10)]]
    });
  }

  onSubmit(): void {
    if (this.contactForm.valid) {
      this.isSubmitting = true;
      this.errorMessage = '';

      // ✅ Utilise then/catch car EmailJS retourne une Promise
      this.contactService.sendMessage(this.contactForm.value)
        .then((response) => {
          console.log('✅ Email envoyé !', response);
          this.submitted = true;
          this.isSubmitting = false;
          this.contactForm.reset();
          setTimeout(() => this.submitted = false, 5000);
        })
        .catch((error) => {
          console.error('❌ Erreur:', error);
          this.errorMessage = 'Erreur lors de l\'envoi du message. Veuillez réessayer.';
          this.isSubmitting = false;
        });
    } else {
      // Marque tous les champs comme touchés pour afficher les erreurs
      Object.keys(this.contactForm.controls).forEach(key => {
        const control = this.contactForm.get(key);
        control?.markAsTouched();
      });
    }
  }

  get f() { return this.contactForm.controls; }
}