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
  formatRatio = 0;

  constructor(
    private elementRef: ElementRef,
    private renderer: Renderer2,
    public dialog: MatDialog,
    private http: HttpClient
  ) {
    const str = JSON.stringify(ImageDataJson.images);
    this.imagesData = JSON.parse(str);

    this.formatRatio =
      document.documentElement.clientHeight /
      document.documentElement.clientWidth;

    fromEvent(window, 'resize').subscribe(() => {
      this.formatRatio =
        document.documentElement.clientWidth /
        document.documentElement.clientHeight;
    });

    fromEvent(this.elementRef.nativeElement, 'scroll').subscribe((e) => {
      this.position = elementRef.nativeElement.scrollTop;
      if (this.position > document.documentElement.clientWidth * 1.1) {
        this.adaptPositions(
          this.position - document.documentElement.clientWidth * 1.1
        );
      }
    });
  }

  ngOnInit(): void {
    this.loadImagesFile();
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
        this.renderer.setStyle(
          el,
          'transform',
          `translate3d(0px,${translateY}px,0px)`
        );
      }
    }
  }

  openDialog(index: number) {
    // const el = this.elementRef.nativeElement.querySelector(
    //   `#image${index}`
    // ) as HTMLElement;
    // let height = 0;
    // let width = 0;
    // if (el.offsetHeight > el.offsetWidth) {
    //   height = document.documentElement.clientHeight * 0.85;
    //   width = height / this.formatRatio;
    // } else {
    //   width = document.documentElement.clientHeight * 0.85;
    //   height = width * this.formatRatio;
    // }
    // console.log('height: ', height);
    // console.log('width: ', width);
    // console.log('ratio', this.formatRatio);
    // this.dialog.open(ImageDialogComponent, {
    //   data: {
    //     image: this.imagesData[index],
    //     heightBigger: el.offsetHeight > el.offsetWidth,
    //     imageHeightPx: height,
    //     imageWidthPx: width,
    //   },
    //   maxWidth: '90vw',
    //   maxHeight: '90vh',
    // });
  }
}
