import { Directive, ElementRef, HostListener, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appAnimateOnScroll]',
})
export class AnimateOnScrollDirective {
  private windowHeight: number;

  constructor(private el: ElementRef, private renderer: Renderer2) {
    this.windowHeight = window.innerHeight;
  }

  ngOnInit(): void {
    setTimeout(() => {
      this.reveal();
    }, 1800);
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.reveal();
  }

  private reveal() {
    const windowBottom = window.scrollY + this.windowHeight;
    const revealPoint = windowBottom - 100;

    const offset =
      this.el.nativeElement.getBoundingClientRect().top + window.scrollY;
    const sectionBottom = offset + this.el.nativeElement.offsetHeight;

    if (offset <= revealPoint && sectionBottom > window.scrollY) {
      this.renderer.addClass(this.el.nativeElement, 'show-animate');
    }
  }
}
