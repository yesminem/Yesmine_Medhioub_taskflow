import { Component, signal, computed, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgClass } from '@angular/common';
import { Project } from '../../models/project.model';
import { TaskStatusEvent, TaskStatus } from '../../models/task.model';
import { ProjectCard } from '../project-card/project-card';
import { ProjectService } from '../../../../core/services/project.service';
import { AutoFocusDirective } from '../../../../shared/directives/auto-focus.directive';

@Component({
  selector: 'app-project-list',
  standalone: true,
  imports: [FormsModule, ProjectCard, AutoFocusDirective, NgClass],
  templateUrl: './project-list.html',
  styleUrl: './project-list.css'
})
export class ProjectList {

  private projectService = inject(ProjectService);

  // Le signal vit dans le service : on le lit seulement
  projects = this.projectService.projects;

  searchTerm = signal('');
  selectedProjectId = signal<number | null>(null);
  statusFilter = signal<TaskStatus | ''>('');

  filters: { label: string; value: TaskStatus | '' }[] = [
    { label: 'Toutes', value: '' },
    { label: 'En cours', value: 'En cours' },
    { label: 'Terminées', value: 'Terminé' },
  ];

  filteredProjects = computed(() => {
    const term = this.searchTerm().toLowerCase();
    return this.projects().filter(project => project.name.toLowerCase().includes(term));
  });

  loading = this.projectService.loading;
  error = this.projectService.error;

  onProjectSelected(project: Project): void {
    this.selectedProjectId.set(project.id);
  }

  onTaskStatusChange(event: TaskStatusEvent & { projectId: number }): void {
    this.projectService.updateTaskStatus(event.projectId, event.taskId, event.status);
  }

  onTaskDelete(event: { taskId: number; projectId: number }): void {
    this.projectService.deleteTask(event.projectId, event.taskId);
  }

  onDeleteProject(id: number): void {
    this.projectService.deleteProject(id);
  }
}