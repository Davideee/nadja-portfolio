import { Component, ElementRef, Input, OnInit, Renderer2 } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import {
  filter,
  fromEvent,
  interval,
  of,
  take,
  delay,
  switchMap,
  tap,
} from 'rxjs';

@Component({
  selector: 'app-protrait',
  templateUrl: './portrait.component.html',
  styleUrls: ['./portrait.component.scss'],
})
export class PortraitComponent implements OnInit {
  @Input() portraitFileName!: string;
  clicked = false;
  clientYStored = 0;
  iconPos = 0;
  clipPos = 15;
  imBottom = 0;
  imTop = 0;
  imHeight = 0;
  showCounter = 0;

  /** **********************************************************************************************
   * ..
   *********************************************************************************************** */
  constructor(
    private elementRef: ElementRef,
    private renderer: Renderer2,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.imBottom =
      this.elementRef.nativeElement.getBoundingClientRect().bottom;
    this.imTop =
      this.imBottom - this.elementRef.nativeElement.getBoundingClientRect().top;
    this.imHeight =
      this.elementRef.nativeElement.getBoundingClientRect().height;

    // Animate in the beginning
    of(1)
      .pipe(
        delay(1500),
        tap(() => (this.showCounter += 1)),
        switchMap(() => interval(10)),
        take(100)
      )
      .subscribe((val) => this.move(val / 10));

    fromEvent(this.elementRef.nativeElement, 'mousemove')
      .pipe(filter(() => this.clicked === true))
      .subscribe((event) => {
        const ev = event as MouseEvent;
        const percent = ((this.imBottom - ev.clientY) / this.imHeight) * 100;

        if (percent < 100) {
          this.move(percent);
        }
        if (percent < 0) {
          this.move(0);
        }
        if (percent > 100) {
          this.move(100);
        }
      });
  }

  /** **********************************************************************************************
   * ..
   *********************************************************************************************** */
  move(move: number) {
    const elCont =
      this.elementRef.nativeElement.querySelector('.icon-container');
    this.renderer.setStyle(elCont, 'bottom', `${move - this.clipPos}%`);
    const elIcon = this.elementRef.nativeElement.querySelector(
      '.icon-container-icon'
    );
    this.renderer.setStyle(elIcon, 'bottom', `${move - this.clipPos}%`);

    const elImg = this.elementRef.nativeElement.querySelector('.img');
    this.renderer.setStyle(elImg, 'clip-path', `inset(0% 0% ${move}% 0%)`);
  }

  /** **********************************************************************************************
   * ..
   *********************************************************************************************** */
  loaded() {
    this.showCounter += 1;
  }
}
