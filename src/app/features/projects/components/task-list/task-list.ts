import { Component, inject, input, signal } from '@angular/core';
import { Task } from '../../models/task.model';
import { User } from '../../../users/models/user.model';
import { UserService } from '../../../../core/services/user.service';
import { DatePipe } from '@angular/common';
import { TruncatePipe } from '../../../../shared/pipes/truncate.pipe';
import { DeadlinePipe } from '../../../../shared/pipes/deadline.pipe';

@Component({
selector: 'app-task-list',
standalone: true,
imports: [DatePipe, TruncatePipe, DeadlinePipe],
templateUrl: './task-list.html',
styleUrl: './task-list.css'
})
export class TaskList {
  tasks = input.required<Task[]>();
  showAssignee = input<boolean>(true);   // default true: existing usage doesn't change

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
  