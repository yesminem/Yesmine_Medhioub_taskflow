import { Component, inject } from '@angular/core';
import { FavoritesService } from '../../../core/services/favorites.service';

@Component({
  selector: 'app-header',
  standalone: true,
  templateUrl: './header.html',
  styleUrl: './header.css'
})
export class Header {
  readonly favorites = inject(FavoritesService);
}