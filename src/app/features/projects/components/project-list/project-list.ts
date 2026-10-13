import { Component, signal, computed, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Project } from '../../models/project.model';
import { PROJECTS } from '../../data/projects.data';
import { ProjectCard } from '../project-card/project-card';
import { ProjectService } from '../../../../core/services/project.service';

@Component({
  selector: 'app-project-list',
  standalone: true,
  imports: [FormsModule, ProjectCard],
  templateUrl: './project-list.html',
  styleUrl: './project-list.css'
})
export class ProjectList implements OnInit {
 
  projects = signal<Project[]>([]);

  searchTerm= signal('');

  onProjectSelected(project: Project): void {
    console.log(project);
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
}