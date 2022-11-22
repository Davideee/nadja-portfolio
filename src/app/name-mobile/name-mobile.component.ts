import { Component, Input, ViewEncapsulation } from '@angular/core';
import { background } from 'src/shared/animations/background';

import SwiperCore, { Pagination } from 'swiper';

SwiperCore.use([Pagination]);

@Component({
  selector: 'app-name-mobile',
  templateUrl: './name-mobile.component.html',
  styleUrls: ['./name-mobile.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: [background],
})
export class NameMobileComponent {
  @Input() portraitFileName!: string;
  @Input() animation!: boolean;

  constructor() {}
}
