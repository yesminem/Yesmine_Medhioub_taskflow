import { Component, input, output } from '@angular/core';

export type ViewMode = 'tasks' | 'users';

@Component({
  selector: 'app-view-toggle',
  standalone: true,
  templateUrl: './view-toggle.html',
  styleUrl: './view-toggle.css'
})
export class ViewToggle {
  view = input.required<ViewMode>();
  viewChange = output<ViewMode>();

  select(mode: ViewMode): void {
    this.viewChange.emit(mode);
  }
}