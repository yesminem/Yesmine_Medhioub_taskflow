import { Component, signal, computed, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Project } from '../../models/project.model';
import { PROJECTS } from '../../data/projects.data';
import { ProjectCard } from '../project-card/project-card';
import { ProjectService } from '../../../../core/services/project.service';
import { AutoFocusDirective } from '../../../../shared/directives/auto-focus.directive';
import { TaskStatusEvent } from '../../models/task.model';

@Component({
  selector: 'app-project-list',
  standalone: true,
  imports: [FormsModule, ProjectCard, AutoFocusDirective],
  templateUrl: './project-list.html',
  styleUrl: './project-list.css'
})
export class ProjectList implements OnInit {
 
  projects = signal<Project[]>([]);

  searchTerm= signal('');

  selectedProjectId = signal<number | null>(null);

  onProjectSelected(project: Project): void {
    this.selectedProjectId.set(project.id);
  }

  filteredProjects = computed(() => {
    const term = this.searchTerm().toLowerCase();
    return this.projects().filter(project => project.name.toLowerCase().includes(term));
  });

  constructor(private projectService: ProjectService) {}
  
  ngOnInit(): void {
    this.projectService.getProjects().subscribe(projects => {
      console.log('projects received:', projects);
      this.projects.set(projects);
    });
  }

  selectProject(project: Project): void {
    console.log('Projet sélectionné :', project);
  }

  onTaskStatusChange(event: TaskStatusEvent & { projectId: number }): void {
    this.projects.update(projects =>
      projects.map(project =>
        project.id !== event.projectId
          ? project                                   // autre projet : inchangé
          : {
              ...project,                             // nouveau projet
              tasks: project.tasks.map(task =>
                task.id === event.taskId
                  ? { ...task, status: event.status } // nouvelle tâche
                  : task                              // autres tâches : inchangées
              ),
            }
      )
    );
}
}