import { Injectable, computed, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class FavoritesService {
  private readonly ids = signal<number[]>([]);

  readonly count = computed(() => this.ids().length);

  isFavorite(id: number): boolean {
    return this.ids().includes(id);
  }

  toggle(id: number): void {
    this.ids.update(list =>
      list.includes(id) ? list.filter(i => i !== id) : [...list, id]
    );
  }
}