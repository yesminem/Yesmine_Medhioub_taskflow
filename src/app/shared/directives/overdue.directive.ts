import { Directive, HostBinding, input } from '@angular/core';

@Directive({ selector: '[appOverdue]', standalone: true })
export class OverdueDirective {
  dueDate = input<string | undefined>();   // optionnelle
  done = input<boolean>(false);

  @HostBinding('class')
  get overdueClasses(): string {
    const due = this.dueDate();
    if (!due || this.done()) return '';    // pas de date ou tâche terminée : aucune classe

    const [y, m, d] = due.split('-').map(Number);
    const dueDay = new Date(y, m - 1, d);
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

    return dueDay < today ? 'border-red-500 bg-red-50' : '';
  }
}