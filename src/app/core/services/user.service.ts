import { Injectable, inject, signal } from '@angular/core';
import { Observable, of } from 'rxjs';
import { User } from '../../features/users/models/user.model';
import { map } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';


@Injectable({ providedIn: 'root' })
export class UserService {

  private http = inject(HttpClient);
  private readonly apiUrl = 'http://localhost:3000/users'; // URL de l'API REST

  readonly id = Math.random().toString(36).slice(2, 8);

  readonly loading = signal(false);
  readonly error = signal<string | null>(null);

  constructor() {
    console.log('UserService créé, id =', this.id);
  }

  getUsers(): Observable<User[]> {
    this.loading.set(true);
    this.error.set(null);
    return this.http.get<User[]>(this.apiUrl).pipe(
      tap(() => this.loading.set(false)),
      catchError(() => {
        this.error.set('Impossible de charger les utilisateurs');
        this.loading.set(false);
        return of([]); // Retourne un tableau vide en cas d'erreur
      })
    );
  }

  getUserById(id: number) {
    return this.http.get<User>(`${this.apiUrl}/${id}`);
  }
}