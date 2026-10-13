import { Component, OnInit, computed, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { User } from '../../models/user.model';
import { Project } from '../../../projects/models/project.model';
import { UserService } from '../../../../core/services/user.service';
import { ProjectService } from '../../../../core/services/project.service';
import { UserCard } from '../user-card/user-card';
import { EmptyState } from '../../../../shared/components/empty-state/empty-state';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [FormsModule, UserCard, EmptyState],
  templateUrl: './user-list.html',
  styleUrl: './user-list.css'
})
export class UserList implements OnInit {
  private userService = inject(UserService);
  private projectService = inject(ProjectService);

  users = signal<User[]>([]);
  projects = signal<Project[]>([]);
  searchTerm = signal('');

  filteredUsers = computed(() => {
    const term = this.searchTerm().toLowerCase();
    return this.users().filter(user => user.name.toLowerCase().includes(term));
  });

  ngOnInit(): void {
    this.userService.getUsers().subscribe(users => this.users.set(users));
    this.projectService.getProjects().subscribe(projects => this.projects.set(projects));
  }
}