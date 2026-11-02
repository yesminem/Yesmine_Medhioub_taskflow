import { Component, input } from '@angular/core';
import { TruncatePipe } from '../../../../shared/pipes/truncate.pipe';
import { DeadlinePipe } from '../../../../shared/pipes/deadline.pipe';
import { NgClass, DatePipe, NgStyle } from '@angular/common';
import { Task, TaskPriority, TaskStatus } from '../../models/task.model';
import { HighlightDirective } from '../../../../shared/directives/highlight.directive';
import { OverdueDirective } from '../../../../shared/directives/overdue.directive';
import { TooltipDirective } from '../../../../shared/directives/tooltip.directive';
import { output } from '@angular/core';



@Component({
  selector: 'app-task-item',
  standalone: true,
  imports: [DatePipe, TruncatePipe, DeadlinePipe, NgClass, NgStyle, HighlightDirective, OverdueDirective, TooltipDirective],
  templateUrl: './task-item.html',
  styleUrl: './task-item.css'
})
export class TaskItem {
  task = input.required<Task>();
  showAssignee = input<boolean>(true);
  assigneeName = input<string>('');

  taskStatusChange = output<TaskStatus>();

  taskDelete = output<void>();

  readonly nextStatus: Record<TaskStatus, TaskStatus> = {
    'En attente': 'En cours',
    'En cours': 'Terminé',
    'Terminé': 'En attente',
  };

  changeStatus(): void {
    this.taskStatusChange.emit(this.nextStatus[this.task().status]);
  } 
  
  statusClasses: Record<TaskStatus, string> = {
    'En attente': 'border-l-gray-400',
    'En cours': 'border-l-blue-500',
    'Terminé': 'border-l-green-500',
  };

  priorityClasses: Record<TaskPriority, string> = {
    Haute: 'bg-red-100 text-red-700',
    Moyenne: 'bg-orange-100 text-orange-700',
    Basse: 'bg-gray-200 text-gray-700',
  };

  progress: Record<TaskStatus, number> = {
    'En attente': 0,
    'En cours': 50,
    'Terminé': 100,
  };

  progressColors: Record<TaskStatus, string> = {
    'En attente': '#9ca3af',
    'En cours': '#3b82f6',
    'Terminé': '#22c55e',
  };

  
}
