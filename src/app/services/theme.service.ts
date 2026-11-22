import { Injectable, signal } from '@angular/core';

export type Theme = 'dark' | 'light';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private readonly THEME_KEY = 'rno_portfolio_theme';
  readonly currentTheme = signal<Theme>('dark');

  constructor() {
    this.initTheme();
  }

  get isDarkMode(): boolean {
    return this.currentTheme() === 'dark';
  }

  private initTheme(): void {
    if (typeof window === 'undefined') return;

    const savedTheme = localStorage.getItem(this.THEME_KEY) as Theme | null;
    if (savedTheme === 'light' || savedTheme === 'dark') {
      this.applyTheme(savedTheme);
    } else {
      // Default to dark theme for modern portfolio aesthetic
      this.applyTheme('dark');
    }
  }

  toggleTheme(): void {
    const nextTheme: Theme = this.currentTheme() === 'dark' ? 'light' : 'dark';
    this.applyTheme(nextTheme);
  }

  setTheme(theme: Theme): void {
    this.applyTheme(theme);
  }

  private applyTheme(theme: Theme): void {
    this.currentTheme.set(theme);

    if (typeof window !== 'undefined') {
      localStorage.setItem(this.THEME_KEY, theme);
      
      const body = document.body;
      const html = document.documentElement;

      if (theme === 'dark') {
        body.classList.remove('light-theme');
        body.classList.add('dark-theme');
        html.setAttribute('data-theme', 'dark');
      } else {
        body.classList.remove('dark-theme');
        body.classList.add('light-theme');
        html.setAttribute('data-theme', 'light');
      }
    }
  }
}
