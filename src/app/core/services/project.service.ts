import { Injectable, signal, inject } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Project } from '../../features/projects/models/project.model';
import { TaskStatus } from '../../features/projects/models/task.model';
import { PROJECTS } from '../../features/projects/data/projects.data';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class ProjectService {

  private http = inject(HttpClient);
  private readonly apiUrl = 'http://localhost:3000/projects'; // URL de l'API REST

  readonly id = Math.random().toString(36).slice(2, 8);

  private readonly _projects = signal<Project[]>([]);
  readonly projects = this._projects.asReadonly();   // lecture seule pour les composants

  readonly loading = signal(false);
  readonly error = signal<string | null>(null);

  constructor() {
    console.log('ProjectService créé, id =', this.id);
    this.loadProjects();
  }

  getProjects(): Observable<Project[]> {
    return this.http.get<Project[]>(this.apiUrl);
  }

  private loadProjects(): void {
    this.loading.set(true);
    this.error.set(null);
    this.getProjects().subscribe({
      next: (projects) => {
        this._projects.set(projects);
        this.loading.set(false);
      },
      error: () =>{
        this.error.set('Impossible de charger les projets');
        this.loading.set(false);
      }
    });
  }

  deleteProject(id: number): void {
    this._projects.update(list => list.filter(p => p.id !== id));
  }

  updateTaskStatus(projectId: number, taskId: number, status: TaskStatus): void {
    this._projects.update(list =>
      list.map(p => p.id !== projectId ? p : {
        ...p,
        tasks: p.tasks.map(t => t.id === taskId ? { ...t, status } : t),
      })
    );
  }

  deleteTask(projectId: number, taskId: number): void {
    this._projects.update(list =>
      list.map(p => p.id !== projectId ? p : {
        ...p,
        tasks: p.tasks.filter(t => t.id !== taskId),
      })
    );
  }
}