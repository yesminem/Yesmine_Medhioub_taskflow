import { Component, input, output } from '@angular/core';
import { UpperCasePipe, DatePipe, CurrencyPipe, PercentPipe, DecimalPipe, SlicePipe, KeyValuePipe } from '@angular/common';
import { Project } from '../../models/project.model';
import { TaskList } from '../task-list/task-list';

@Component({
  selector: 'app-project-card',
  standalone: true,
  imports: [TaskList, UpperCasePipe, DatePipe, CurrencyPipe, PercentPipe, DecimalPipe, SlicePipe, KeyValuePipe],
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



}
