import { Component, input, output } from '@angular/core';
import { UpperCasePipe, DatePipe, CurrencyPipe, PercentPipe, DecimalPipe, SlicePipe, KeyValuePipe, NgStyle } from '@angular/common';
import { Project } from '../../models/project.model';
import { TaskList } from '../task-list/task-list';
import { HighlightDirective } from '../../../../shared/directives/highlight.directive';
import { FilterStatusPipe } from '../../../../shared/pipes/filter-status.pipe';

@Component({
  selector: 'app-project-card',
  standalone: true,
  imports: [TaskList, UpperCasePipe, DatePipe, CurrencyPipe, PercentPipe, DecimalPipe, SlicePipe, KeyValuePipe, NgStyle, HighlightDirective, FilterStatusPipe],
  templateUrl: './project-card.html',
  styleUrl: './project-card.css'
})

export class ProjectCard {

project = input.required<Project>();

projectSelected = output<Project>();

selectProject(): void {
this.projectSelected.emit(this.project());
}

get completionRate(): number {
    const tasks = this.project().tasks;
    return tasks.filter(t=> t.status === 'Terminé').length / tasks.length;
}

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
  const rate = this.completionRate * 100;
  if (rate < 34) return '#ef4444';
  if (rate <= 66) return '#f59e0b';
  return '#22c55e';
}



}
