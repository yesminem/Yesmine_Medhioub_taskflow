import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'deadline', standalone: true })
export class DeadlinePipe implements PipeTransform {
  transform(value: string | undefined | null): string {
    if (!value) return "Pas d'échéance";

    // Date de l'échéance et date du jour, toutes deux à minuit (heure locale)
    const [y, m, d] = value.split('-').map(Number);
    const due = new Date(y, m - 1, d);
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

    // Écart en jours (positif = futur, négatif = passé)
    const diff = Math.round((due.getTime() - today.getTime()) / 86400000);

    if (diff === 0) return "Aujourd'hui";
    if (diff === 1) return 'Demain';
    if (diff > 1) return `Dans ${diff} jours`;

    const late = -diff;
    return `En retard de ${late} jour${late > 1 ? 's' : ''}`;
  }
}