import { Directive, ElementRef, HostListener, OnDestroy, Renderer2, inject, input } from '@angular/core';

@Directive({ selector: '[appTooltip]', standalone: true })
export class TooltipDirective implements OnDestroy {
  appTooltip = input<string>('');
  private host = inject(ElementRef).nativeElement as HTMLElement;
  private renderer = inject(Renderer2);
  private bubble: HTMLElement | null = null;

  @HostListener('mouseenter')
  show(): void {
    const text = this.appTooltip();
    if (!text || this.bubble) return;                       // rien à afficher, ou bulle déjà là

    this.renderer.setStyle(this.host, 'position', 'relative');  // repère pour la bulle

    this.bubble = this.renderer.createElement('span');
    this.renderer.appendChild(this.bubble, this.renderer.createText(text));
    this.renderer.setAttribute(this.bubble, 'class',
      'absolute left-0 top-full mt-1 z-10 w-max max-w-xs rounded bg-gray-800 px-2 py-1 text-xs text-white shadow');
    this.renderer.appendChild(this.host, this.bubble);
  }

  @HostListener('mouseleave')
  hide(): void {
    if (!this.bubble) return;
    this.renderer.removeChild(this.host, this.bubble);
    this.bubble = null;
  }

  ngOnDestroy(): void {
    this.hide();                                            // nettoie si l'élément disparaît
  }
}