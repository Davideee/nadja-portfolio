import { Component, ElementRef, OnInit, Renderer2 } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import ImageDataJson from '../../assets/config/images.json';
import { EMovement, ImageData, ImagesDto } from '../model/image';
import { HttpClient } from '@angular/common/http';
import { take, fromEvent } from 'rxjs';
import { ImageDialogComponent } from '../image-dialog/image-dialog.component';

@Component({
  selector: 'app-scroll-container',
  templateUrl: './scroll-container.component.html',
  styleUrls: ['./scroll-container.component.scss'],
})
export class ScrollContainerComponent implements OnInit {
  imagesData: ImageData[];
  position = 0;
  topFlag = true;
  scrollHeight: number;
  coverPercentage = 0;

  constructor(
    private elementRef: ElementRef,
    private renderer: Renderer2,
    public dialog: MatDialog,
    private http: HttpClient
  ) {
    const str = JSON.stringify(ImageDataJson.images);
    this.imagesData = JSON.parse(str);
    this.scrollHeight =
      document.documentElement.clientWidth +
      document.documentElement.clientHeight;

    fromEvent(window, 'resize').subscribe(() => {
      this.scrollHeight =
        document.documentElement.clientWidth +
        document.documentElement.clientHeight;
      const move =
        (this.coverPercentage / 100) * document.documentElement.clientWidth;
      this.movePortrait(move, move);
    });
    fromEvent(this.elementRef.nativeElement, 'scroll').subscribe((e) => {
      this.position = elementRef.nativeElement.scrollTop;

      if (this.position < document.documentElement.clientWidth) {
        // We are still on the top
        const el = this.elementRef.nativeElement.querySelector('.portrait');
        this.movePortrait(this.position, this.position);
        this.coverPercentage =
          this.position / document.documentElement.clientWidth;
        this.topFlag = true;
      } else {
        this.adaptPositions(
          this.position - document.documentElement.clientWidth
        );
        if (this.topFlag) {
          this.movePortrait(
            document.documentElement.clientWidth,
            document.documentElement.clientWidth
          );
          this.coverPercentage = 100;
          this.topFlag = false;
        }
      }
    });
  }

  ngOnInit(): void {
    this.loadImagesFile();
  }

  movePortrait(directionX: number, directionY: number) {
    const el = this.elementRef.nativeElement.querySelector('.portrait');
    this.renderer.setStyle(
      el,
      'transform',
      `translate(${directionX}px, ${directionY}px)`
    );
  }

  loadImagesFile() {
    this.http
      .get<ImagesDto>('assets/config/images.json')
      .pipe(take(1))
      .subscribe((data) => {
        this.imagesData = data.images;
      });
  }

  adaptPositions(position: number): void {
    for (let i = 0; i < this.imagesData.length; i++) {
      if (
        EMovement[this.imagesData[i].movement] == EMovement.down ||
        EMovement[this.imagesData[i].movement] == EMovement.up
      ) {
        const el = this.elementRef.nativeElement.querySelector(`#image${i}`);
        let translateY = (position * this.imagesData[i].velocity) / 100;
        if (EMovement[this.imagesData[i].movement] == EMovement.up) {
          translateY *= -1;
        }
        this.renderer.setStyle(el, 'transform', `translateY(${translateY}px)`);
      }
    }
  }

  openDialog(index: number) {
    const el = this.elementRef.nativeElement.querySelector(
      `#image${index}`
    ) as HTMLElement;

    this.dialog.open(ImageDialogComponent, {
      data: {
        image: this.imagesData[index],
        heightBigger: el.offsetHeight > el.offsetWidth,
      },
      width: '90vw',
      height: '90vh',
    });
  }
}
