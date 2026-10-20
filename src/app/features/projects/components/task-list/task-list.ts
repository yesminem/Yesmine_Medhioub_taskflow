import { Component, inject, input, signal } from '@angular/core';
import { Task } from '../../models/task.model';
import { User } from '../../../users/models/user.model';
import { UserService } from '../../../../core/services/user.service';
import { TruncatePipe } from '../../../../shared/pipes/truncate.pipe';
import { DeadlinePipe } from '../../../../shared/pipes/deadline.pipe';
import { NgClass, DatePipe } from '@angular/common';
import { TaskStatus } from '../../models/task.model';
import { HighlightDirective } from '../../../../shared/directives/highlight.directive';
import { OverdueDirective } from '../../../../shared/directives/overdue.directive';
import { TooltipDirective } from '../../../../shared/directives/tooltip.directive';

@Component({
selector: 'app-task-list',
standalone: true,
imports: [DatePipe, TruncatePipe, DeadlinePipe, NgClass, HighlightDirective, OverdueDirective, TooltipDirective],
templateUrl: './task-list.html',
styleUrl: './task-list.css'
})

export class TaskList {
  tasks = input.required<Task[]>();
  showAssignee = input<boolean>(true);   // default true: existing usage doesn't change

  statusClasses: Record<TaskStatus, string> = {
  'En attente': 'bg-gray-50 border-l-gray-400',
  'En cours': 'bg-blue-50 border-l-blue-500',
  'Terminé': 'bg-green-50 border-l-green-500',
  };

  private userService = inject(UserService);
  private users = signal<User[]>([]);

  constructor() {
    this.userService.getUsers().subscribe(users => this.users.set(users));
  }

  assigneeName(id?: number): string {
    if (id === undefined) return 'Non assignée';
    return this.users().find(user => user.id === id)?.name ?? 'Inconnu';
  }
}
  