import { Component, ElementRef, Input, Renderer2 } from '@angular/core';
import { fromEvent } from 'rxjs';

@Component({
  selector: 'app-name-container',
  templateUrl: './name-container.component.html',
  styleUrls: ['./name-container.component.scss'],
})
export class NameContainerComponent {
  @Input() position: number = 0;

  topFlag = true;
  coverPercentage = 0;
  scrollHeight = 0;
  FACTOR_HEIGHT = 1.1;

  constructor(private renderer: Renderer2, private elementRef: ElementRef) {
    this.scrollHeight =
      document.documentElement.clientWidth +
      document.documentElement.clientHeight;
    this.scrollHeight *= this.FACTOR_HEIGHT;

    fromEvent(window, 'resize').subscribe(() => {
      this.scrollHeight =
        document.documentElement.clientWidth +
        document.documentElement.clientHeight;
      this.scrollHeight *= this.FACTOR_HEIGHT;

      const move =
        (this.coverPercentage / 100) * document.documentElement.clientWidth;
      this.movePortrait(move, move);
    });
  }

  ngOnChanges(changes: any): void {
    if (changes.position) {
      if (this.position < document.documentElement.clientWidth) {
        // We are still on the top
        const el = this.elementRef.nativeElement.querySelector('.portrait');
        this.movePortrait(this.position, this.position);
        this.coverPercentage =
          this.position / document.documentElement.clientWidth;
        this.topFlag = true;
      } else {
        if (this.topFlag) {
          this.movePortrait(
            document.documentElement.clientWidth,
            document.documentElement.clientWidth
          );
          this.coverPercentage = 100;
          this.topFlag = false;
        }
      }
    }
  }

  movePortrait(directionX: number, directionY: number) {
    const el = this.elementRef.nativeElement.querySelector('.portrait');
    this.renderer.setStyle(
      el,
      'transform',
      `translate3d(${directionX}px, ${directionY}px,0px)`
    );
  }
}
