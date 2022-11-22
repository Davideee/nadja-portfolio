import {
  Component,
  ElementRef,
  Input,
  Renderer2,
  SimpleChanges,
} from '@angular/core';
import { background } from 'src/shared/animations/background';

@Component({
  selector: 'app-name-container',
  templateUrl: './name-container.component.html',
  styleUrls: ['./name-container.component.scss'],
  animations: [background],
})
export class NameContainerComponent {
  @Input() portraitFileName!: string;
  @Input() position!: number;
  @Input() animation!: boolean;

  show = false;
  mobile = false;
  scrollPosition = false;

  /** **********************************************************************************************
   * ..
   *********************************************************************************************** */
  constructor(private elementRef: ElementRef, private renderer: Renderer2) {
    if (window.innerWidth < 768) {
      this.mobile = true;
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['position']) {
      const cv = changes['position'].currentValue;
      if (cv <= window.innerWidth * 0.45) {
        const elName = this.elementRef.nativeElement.querySelector(
          '.name-container__footer'
        );
        this.renderer.setStyle(
          elName,
          'transform',
          `translate3d(${cv}px, ${cv}px,0vw)`
        );
        this.scrollPosition = false;
      }
    }
  }
}
