import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { User } from '../../features/users/models/user.model';
import { USERS } from '../../features/users/data/users.data';
import { map } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class UserService {
  getUsers(): Observable<User[]> {
    return of(USERS);
  }

  getUserById(id: number) {
    return this.getUsers().pipe(map(users => users.find(u => u.id === id)));
  }
}