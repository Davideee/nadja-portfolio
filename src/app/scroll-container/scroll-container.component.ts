import {
  Component,
  Directive,
  ElementRef,
  Input,
  OnInit,
  Renderer2,
  SimpleChanges,
} from '@angular/core';
import ImageDataJson from '../../assets/config/images.json';
import { EMovement, ImageData } from '../model/image';

@Directive({
  selector: '[scrollMovement]',
})
export class ScrollMovementDirective {
  constructor(private el: ElementRef) {
    this.el.nativeElement.style.backgroundColor = 'yellow';
  }
}

@Component({
  selector: 'app-scroll-container',
  templateUrl: './scroll-container.component.html',
  styleUrls: ['./scroll-container.component.scss'],
})
export class ScrollContainerComponent implements OnInit {
  @Input() position = 0;
  imagesData: ImageData[];

  constructor(private elementRef: ElementRef, private renderer: Renderer2) {
    const str = JSON.stringify(ImageDataJson.images);
    this.imagesData = JSON.parse(str);
  }

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['position'] && !changes['position'].firstChange) {
      const pos = changes['position'].currentValue;
      for (let i = 0; i < this.imagesData.length; i++) {
        if (
          EMovement[this.imagesData[i].movement] == EMovement.down ||
          EMovement[this.imagesData[i].movement] == EMovement.up
        ) {
          const el = this.elementRef.nativeElement.querySelector(`#image${i}`);
          let translateY = (pos * this.imagesData[i].velocity) / 100;
          if (EMovement[this.imagesData[i].movement] == EMovement.up) {
            translateY *= -1;
          }
          this.renderer.setStyle(
            el,
            'transform',
            `translateY(${translateY}px)`
          );
        }
      }
    }
  }
}
