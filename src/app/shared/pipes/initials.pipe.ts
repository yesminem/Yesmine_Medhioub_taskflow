import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'initials', standalone: true })
export class InitialsPipe implements PipeTransform {
  transform(value: string | undefined | null): string {
    if (!value?.trim()) return '?';                   
    return value
      .trim()
      .split(/\s+/)                                    
      .slice(0, 2)                                     
      .map(word => word[0].toUpperCase())              
      .join('');
  }
}