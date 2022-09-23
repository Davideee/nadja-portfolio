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
  imagesData: ImageData[] = [];
  private imagesDataRaw: ImageData[];
  private animationFinished = false;
  private coverPercentage = 0;
  private position = 0;
  private formatRatio = 0;
  private REFERENCE_RATIO = 0.1;
  protected scrollHeight = 0;

  constructor(
    private elementRef: ElementRef,
    private renderer: Renderer2,
    public dialog: MatDialog,
    private http: HttpClient
  ) {
    const str = JSON.stringify(ImageDataJson.images);
    this.imagesDataRaw = JSON.parse(str);
    for (let i = 0; i < this.imagesDataRaw.length; i++) {
      this.imagesData.push({ ...this.imagesDataRaw[i] });
    }
    this.adaptImageParameters();

    fromEvent(window, 'resize').subscribe(() => {
      this.formatRatio = window.innerHeight / window.innerWidth;
      this.adaptImageParameters();
    });

    fromEvent(this.elementRef.nativeElement, 'scroll').subscribe((e) => {
      this.position = elementRef.nativeElement.scrollTop;
      this.coverPercentage =
        (this.position / document.documentElement.clientWidth) * 100;
      if (this.coverPercentage <= 100) {
        this.moveImageContainer();
        this.animationFinished = false;
      } else {
        if (!this.animationFinished) {
          this.moveImageContainer(0);
          this.animationFinished = true;
        }
      }
      if (!this.position) {
        this.moveImageContainer(-100);
      }
      this.adaptPositions(this.position - window.innerWidth);
    });
  }

  ngOnInit(): void {
    this.loadImagesFile();
  }

  adaptImageParameters(): void {
    this.formatRatio = window.innerHeight / window.innerWidth;
    document.documentElement.clientWidth;
    for (let i = 0; i < this.imagesData.length; i++) {
      this.imagesData[i].distanceTop =
        (this.imagesDataRaw[i].distanceTop * this.REFERENCE_RATIO) /
        this.formatRatio;
    }
  }
  loadImagesFile() {
    this.http
      .get<ImagesDto>('assets/config/images.json')
      .pipe(take(1))
      .subscribe((data) => {
        this.imagesData = data.images;
      });
  }

  moveImageContainer(move?: number) {
    if (move !== undefined) {
      const elContainer =
        this.elementRef.nativeElement.querySelector('.image-container');
      this.renderer.setStyle(
        elContainer,
        'transform',
        `translate3d(${move}vw, -300vh,0vw)`
      );
    } else {
      const elContainer =
        this.elementRef.nativeElement.querySelector('.image-container');
      this.renderer.setStyle(
        elContainer,
        'transform',
        `translate3d(${-100 + this.coverPercentage}vw, -300vh,0vw)`
      );
      const elName = this.elementRef.nativeElement.querySelector('#text-nadja');
      this.renderer.setStyle(
        elName,
        'transform',
        `translate3d(0px, ${this.position}px,0vw)`
      );
    }
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
    const el = this.elementRef.nativeElement.querySelector(
      `#image${index}`
    ) as HTMLElement;

    this.dialog.open(ImageDialogComponent, {
      data: {
        image: this.imagesData[index],
        heightBigger: el.offsetHeight > el.offsetWidth,
      },
      maxWidth: '90vw',
      maxHeight: '90vh',
      restoreFocus: true,
    });
  }
}
