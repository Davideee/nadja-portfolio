import { Component, ElementRef, Input, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-name-container',
  templateUrl: './name-container.component.html',
  styleUrls: ['./name-container.component.scss'],
})
export class NameContainerComponent {
  @Input() position: number = 0;
  constructor(private renderer: Renderer2, private elementRef: ElementRef) {}

  ngOnChanges(changes: any): void {
    if (changes.position) {
      if (window.outerWidth * 1.1 > changes.position.currentValue) {
        const el = this.elementRef.nativeElement.querySelector('.portrait');
        this.renderer.setStyle(
          el,
          'transform',
          `translateX(${changes.position.currentValue}px)`
        );
        // https://stackoverflow.com/questions/16981763/invert-css-font-color-depending-on-background-color
      }
    }
  }
}
