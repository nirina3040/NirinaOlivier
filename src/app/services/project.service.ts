import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

export interface Project {
  _id?: string;
  title: string;
  description: string;
  imageUrl?: string;
  technologies: string[];
  githubUrl?: string;
  liveUrl?: string;
  featured?: boolean;
  createdAt?: Date;
}

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  private apiUrl = 'http://localhost:3000/api/projects';

  constructor(private http: HttpClient) { }

  getProjects(): Observable<Project[]> {
    return this.http.get<Project[]>(this.apiUrl).pipe(
      catchError(error => {
        console.error('Erreur chargement projets:', error);
        return of([]);
      })
    );
  }

  getProject(id: string): Observable<Project | null> {
    return this.http.get<Project>(`${this.apiUrl}/${id}`).pipe(
      catchError(error => {
        console.error('Erreur chargement projet:', error);
        return of(null);
      })
    );
  }

  getFeaturedProjects(): Observable<Project[]> {
    return this.http.get<Project[]>(`${this.apiUrl}?featured=true`).pipe(
      catchError(error => {
        console.error('Erreur chargement projets featured:', error);
        return of([]);
      })
    );
  }
}