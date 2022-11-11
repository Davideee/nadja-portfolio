import { Component, ElementRef, OnInit, Renderer2 } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { EMovement, ImageData, ImagesDto } from '../model/image';
import { HttpClient } from '@angular/common/http';
import { fromEvent } from 'rxjs';
import { ImageDialogComponent } from '../image-dialog/image-dialog.component';

@Component({
  selector: 'app-scroll-container',
  templateUrl: './scroll-container.component.html',
  styleUrls: ['./scroll-container.component.scss'],
})
export class ScrollContainerComponent implements OnInit {
  imagesData: ImageData[] = [];
  imagesDataRaw: ImageData[] = [];
  private animationFinished = false;
  private coverPercentage = 0;
  position = 0;
  private pageHeight?: number;
  portraitFileName?: string;
  mobile = false;

  /** **********************************************************************************************
   * ..
   *********************************************************************************************** */
  constructor(
    private elementRef: ElementRef,
    private renderer: Renderer2,
    public dialog: MatDialog,
    private http: HttpClient
  ) {
    this.loadConfigFile();
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
      this.calcNewImagePositions();
    });
  }

  /** **********************************************************************************************
   * ..
   *********************************************************************************************** */
  loadConfigFile() {
    let path = 'assets/config/';

    if (window.innerWidth < 768) {
      this.mobile = true;
      path += 'images.mobile.json';
    } else {
      path += 'images.json';
    }
    this.http.get<ImagesDto>(path).subscribe((dto) => {
      this.imagesDataRaw = dto.images;
      this.pageHeight = dto.pageHeight;
      this.portraitFileName = dto.portraitFileName;
      const elContainer =
        this.elementRef.nativeElement.querySelector('.image-container');
      this.renderer.setStyle(elContainer, 'height', `${this.pageHeight}%`);
      for (let i = 0; i < this.imagesDataRaw.length; i++) {
        this.imagesData.push({ ...this.imagesDataRaw[i] });
      }
    });
  }

  /** **********************************************************************************************
   * ..
   *********************************************************************************************** */
  ngOnInit(): void {
    console.log(this.mobile);
  }

  /** **********************************************************************************************
   * ..
   *********************************************************************************************** */
  calcNewImagePositions() {
    for (let i = 0; i < this.imagesData.length; i++) {
      let movement = 1;
      if (
        EMovement[this.imagesData[i].movement] == EMovement.down ||
        EMovement[this.imagesData[i].movement] == EMovement.up
      ) {
        if (EMovement[this.imagesData[i].movement] == EMovement.up) {
          movement *= -1;
        }
        let translateY =
          (((this.position - this.imagesData[i].distanceTop) *
            this.imagesData[i].velocity) /
            100) *
          movement;
        this.moveImage(translateY, i);
      }
    }
  }

  /** **********************************************************************************************
   * ..
   *********************************************************************************************** */
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

  /** **********************************************************************************************
   * ..
   *********************************************************************************************** */
  moveImage(position: number, imageNumber: number): void {
    const el = this.elementRef.nativeElement.querySelector(
      `#image${imageNumber}`
    );
    this.renderer.setStyle(
      el,
      'transform',
      `translate3d(0px,${position}px,0px)`
    );
  }

  /** **********************************************************************************************
   * ..
   *********************************************************************************************** */
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
