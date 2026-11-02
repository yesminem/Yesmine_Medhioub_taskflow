import { Component, input, output, computed } from '@angular/core';
import { UpperCasePipe, DatePipe, CurrencyPipe, PercentPipe, DecimalPipe, SlicePipe, KeyValuePipe, NgStyle, NgClass } from '@angular/common';
import { Project } from '../../models/project.model';
import { TaskList } from '../task-list/task-list';
import { HighlightDirective } from '../../../../shared/directives/highlight.directive';
import { FilterStatusPipe } from '../../../../shared/pipes/filter-status.pipe';
import { TaskStatusEvent, TaskStatus } from '../../models/task.model';

@Component({
  selector: 'app-project-card',
  standalone: true,
  imports: [TaskList, UpperCasePipe, DatePipe, CurrencyPipe, PercentPipe, DecimalPipe, SlicePipe, KeyValuePipe, NgStyle, HighlightDirective, FilterStatusPipe, NgClass],
  templateUrl: './project-card.html',
  styleUrl: './project-card.css'
})

export class ProjectCard {

project = input.required<Project>();
selected = input<boolean>(false);

projectSelected = output<Project>();

taskStatusChange = output<TaskStatusEvent & { projectId: number}>(); 

taskDelete = output<{ taskId: number, projectId: number }>();

statusFilter = input<TaskStatus | ''>('');

onTaskDelete(taskId: number): void {
  this.taskDelete.emit({ taskId, projectId: this.project().id });
}

selectProject(): void {
this.projectSelected.emit(this.project());
}

onTaskStatusChange(event: TaskStatusEvent): void {
  this.taskStatusChange.emit({ ...event, projectId: this.project().id });
}

doneCount = computed(() =>
  this.project().tasks.filter(t => t.status === 'Terminé').length
);

completionRate = computed(() => {
  const total = this.project().tasks.length;
  return total === 0 ? 0 : this.doneCount() / total;
});

get averageCost(): number {
    return this.project().budget / this.project().tasks.length;
}

get tasksByPriority(): Record<string, number> {
    const result: Record<string, number> = {};
    for (const t of this.project().tasks) {
        result[t.priority] = (result[t.priority] ?? 0) + 1;
    }
    return result;
}

get barColor(): string {
  const rate = this.completionRate() * 100;
  if (rate < 34) return '#ef4444';
  if (rate <= 66) return '#f59e0b';
  return '#22c55e';
}



}
