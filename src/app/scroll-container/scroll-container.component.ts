import {
  Component,
  ElementRef,
  Input,
  OnInit,
  Renderer2,
  SimpleChanges,
} from '@angular/core';
import { Subject } from 'rxjs';
import ImageDataJson from '../../assets/config/images.json';
import { ImageData } from '../model/image';

@Component({
  selector: 'app-scroll-container',
  templateUrl: './scroll-container.component.html',
  styleUrls: ['./scroll-container.component.scss'],
})
export class ScrollContainerComponent implements OnInit {
  @Input() position = 0;
  private unsubscribe = new Subject<void>();
  imagesData: ImageData[];

  constructor(private elementRef: ElementRef, private renderer: Renderer2) {
    const str = JSON.stringify(ImageDataJson.images);
    this.imagesData = JSON.parse(str);
    console.log(this.imagesData[0]);
  }

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['position']) {
      const pos = changes['position'].currentValue;

      const el = this.elementRef.nativeElement.querySelector('#image1');
      console.log(`${pos + this.imagesData[1].distanceTop}`);
      this.renderer.setStyle(el, 'transform', `translateY(${pos}px)`);
    }
  }
}
