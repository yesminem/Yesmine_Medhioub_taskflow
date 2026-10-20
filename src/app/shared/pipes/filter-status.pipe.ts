import { Pipe, PipeTransform } from '@angular/core';
import { Task, TaskStatus } from '../../features/projects/models/task.model';

@Pipe({ name: 'filterStatus', standalone: true })
export class FilterStatusPipe implements PipeTransform {
  transform(tasks: Task[] | undefined | null, status: TaskStatus | ''): Task[] {
    if (!tasks) return [];                          // missing value: empty list
    if (!status) return tasks;                      // no status given: no filtering
    return tasks.filter(t => t.status === status);
  }
}