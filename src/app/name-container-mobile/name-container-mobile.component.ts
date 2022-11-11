import {
  Component,
  ElementRef,
  Input,
  Renderer2,
  SimpleChanges,
  ViewEncapsulation,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';

import SwiperCore, { Pagination } from 'swiper';

SwiperCore.use([Pagination]);

@Component({
  selector: 'app-name-container-mobile',
  templateUrl: './name-container-mobile.component.html',
  styleUrls: ['./name-container-mobile.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class NameContainerMobileComponent {
  @Input() portraitFileName!: string;
  @Input() position!: number;

  /** **********************************************************************************************
   * ..
   *********************************************************************************************** */
  constructor(
    private elementRef: ElementRef,
    private renderer: Renderer2,
    public dialog: MatDialog
  ) {}

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

  /** **********************************************************************************************
   * ..
   *********************************************************************************************** */
  loadConfigFile() {}
}
