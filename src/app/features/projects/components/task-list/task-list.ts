import { Component, inject, input, signal, output } from '@angular/core';
import { Task } from '../../models/task.model';
import { User } from '../../../users/models/user.model';
import { UserService } from '../../../../core/services/user.service';
import { TaskItem } from '../task-item/task-item';
import { TaskStatus, TaskStatusEvent } from '../../models/task.model';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [TaskItem],
  templateUrl: './task-list.html',
  styleUrl: './task-list.css'
})
export class TaskList {
  tasks = input.required<Task[]>();
  showAssignee = input<boolean>(true);

  taskStatusChange = output<TaskStatusEvent>();

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