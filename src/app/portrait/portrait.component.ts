import {
  AfterContentChecked,
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnInit,
  Renderer2,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';
import { filter, fromEvent, tap } from 'rxjs';

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

  /** **********************************************************************************************
   * ..
   *********************************************************************************************** */
  constructor(
    private elementRef: ElementRef,
    private renderer: Renderer2,
    public dialog: MatDialog,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    const elImg = this.elementRef.nativeElement.querySelector('.img');
    this.imBottom =
      this.elementRef.nativeElement.getBoundingClientRect().bottom;
    this.imTop =
      this.imBottom - this.elementRef.nativeElement.getBoundingClientRect().top;
    this.imHeight =
      this.elementRef.nativeElement.getBoundingClientRect().height;
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
  start() {
    console.log('start');
  }

  /** **********************************************************************************************
   * ..
   *********************************************************************************************** */
  move(move: number) {
    const elIcon = this.elementRef.nativeElement.querySelector('.icon');
    this.renderer.setStyle(elIcon, 'bottom', `${move - this.clipPos}%`);

    const elImg = this.elementRef.nativeElement.querySelector('.img');
    this.renderer.setStyle(elImg, 'clip-path', `inset(0% 0% ${move}% 0%)`);
  }

  /** **********************************************************************************************
   * ..
   *********************************************************************************************** */
  loaded(event: Event) {
    // console.log(event);
  }
}
