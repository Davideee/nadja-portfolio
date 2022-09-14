import {
  Component,
  ElementRef,
  Input,
  OnInit,
  Renderer2,
  SimpleChanges,
} from '@angular/core';
import { fromEvent, Subject } from 'rxjs';
import { IMAGE_DATA } from '../model/image-data';

@Component({
  selector: 'app-scroll-container',
  templateUrl: './scroll-container.component.html',
  styleUrls: ['./scroll-container.component.scss'],
})
export class ScrollContainerComponent implements OnInit {
  @Input() position = 0;
  private unsubscribe = new Subject<void>();

  imageData = IMAGE_DATA;
  constructor(private elementRef: ElementRef, private renderer: Renderer2) {}

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['position']) {
      const pos = changes['position'].currentValue;

      const el = this.elementRef.nativeElement.querySelector('#image1');
      console.log(`${pos + this.imageData[1].distanceTop}`);
      this.renderer.setStyle(
        el,
        'top',
        `${pos + this.imageData[0].distanceTop}px`
      );
    }
  }
}
