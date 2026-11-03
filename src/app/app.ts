import { Component, signal } from '@angular/core';
import { ProjectList } from './features/projects/components/project-list/project-list';
import { UserList } from './features/users/components/user-list/user-list';
import { ViewToggle, ViewMode } from './shared/components/view-toggle/view-toggle';
import { Header } from './shared/components/header/header';

@Component({
  imports: [ProjectList, UserList, ViewToggle, Header],
  standalone: true,
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App {

  currentView = signal<ViewMode>('tasks');

}
