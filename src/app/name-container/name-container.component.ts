import {
  Component,
  ElementRef,
  Input,
  Renderer2,
  SimpleChanges,
} from '@angular/core';

@Component({
  selector: 'app-name-container',
  templateUrl: './name-container.component.html',
  styleUrls: ['./name-container.component.scss'],
})
export class NameContainerComponent {
  @Input() portraitFileName!: string;
  @Input() position!: number;

  /** **********************************************************************************************
   * ..
   *********************************************************************************************** */
  constructor(private elementRef: ElementRef, private renderer: Renderer2) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['position']) {
      const cv = changes['position'].currentValue;
      const elName = this.elementRef.nativeElement.querySelector(
        '.name__footer-container'
      );
      this.renderer.setStyle(
        elName,
        'transform',
        `translate3d(${cv}px, ${cv}px,0vw)`
      );
    }
  }
}
