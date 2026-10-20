import { Component, computed, input } from '@angular/core';
import { User } from '../../models/user.model';
import { Project } from '../../../projects/models/project.model';
import { Task } from '../../../projects/models/task.model';
import { UserProjectGroup } from '../user-project-group/user-project-group';
import { EmptyState } from '../../../../shared/components/empty-state/empty-state';
import { LowerCasePipe, TitleCasePipe } from '@angular/common';
import { InitialsPipe } from '../../../../shared/pipes/initials.pipe';
import { NgClass, NgStyle } from '@angular/common';
import { HighlightDirective } from '../../../../shared/directives/highlight.directive';

interface ProjectGroup {
  projectId: number;
  projectName: string;
  tasks: Task[];
}

@Component({
  selector: 'app-user-card',
  standalone: true,
  imports: [UserProjectGroup, EmptyState, LowerCasePipe, TitleCasePipe, InitialsPipe, NgClass, NgStyle, HighlightDirective],
  templateUrl: './user-card.html',
  styleUrl: './user-card.css'
})
export class UserCard {
  user = input.required<User>();
  projects = input.required<Project[]>();

  roleColors: Record<string, string> = {
    'Développeur': '#2563eb',     // bleu
    'Designer': '#9333ea',        // violet
    'Chef de projet': '#dc2626',  // rouge
    'Testeur': '#16a34a',         // vert
  };

  // For each project, keep only this user's tasks, then drop projects with none
  groups = computed<ProjectGroup[]>(() =>
    this.projects()
      .map(project => ({
        projectId: project.id,
        projectName: project.name,
        tasks: project.tasks.filter(task => task.assigneeId === this.user().id)
      }))
      .filter(group => group.tasks.length > 0)
  );

  // All the user's tasks in one flat array (flatMap = map + merge the arrays)
  allTasks = computed(() => this.groups().flatMap(group => group.tasks));

  todoCount = computed(() => this.allTasks().filter(t => t.status === 'En attente').length);
  inProgressCount = computed(() => this.allTasks().filter(t => t.status === 'En cours').length);
  doneCount = computed(() => this.allTasks().filter(t => t.status === 'Terminé').length);
}