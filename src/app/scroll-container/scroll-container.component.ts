import { Component, ElementRef, Renderer2 } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { EMovement, ImageData, ImagesDto } from '../model/image';
import { HttpClient } from '@angular/common/http';
import { fromEvent } from 'rxjs';
import { ImageDialogComponent } from '../image-dialog/image-dialog.component';
import { background } from 'src/shared/animations/background';

@Component({
  selector: 'app-scroll-container',
  templateUrl: './scroll-container.component.html',
  styleUrls: ['./scroll-container.component.scss'],
  animations: [background],
})
export class ScrollContainerComponent {
  imagesData: ImageData[] = [];
  imagesDataRaw: ImageData[] = [];
  position = 0;
  animation = false;
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

      if (this.position <= window.innerWidth * 0.45) {
        this.animation = false;
        console.log(this.animation);
      } else if (this.position > window.innerWidth * 0.45 && !this.animation) {
        this.animation = true;
        console.log(this.animation);
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

  // /** **********************************************************************************************
  //  * ..
  //  *********************************************************************************************** */
  // moveImageContainer(move?: number) {
  //   if (move !== undefined) {
  //     const elContainer =
  //       this.elementRef.nativeElement.querySelector('.image-container');
  //     this.renderer.setStyle(
  //       elContainer,
  //       'transform',
  //       `translate3d(${move}vw, -300vh,0vw)`
  //     );
  //   } else {
  //     const elContainer =
  //       this.elementRef.nativeElement.querySelector('.image-container');
  //     this.renderer.setStyle(
  //       elContainer,
  //       'transform',
  //       `translate3d(${-100 + this.coverPercentage}vw, -300vh,0vw)`
  //     );
  //     const elName = this.elementRef.nativeElement.querySelector('#text-nadja');
  //     this.renderer.setStyle(
  //       elName,
  //       'transform',
  //       `translate3d(0px, ${this.position}px,0vw)`
  //     );
  //   }
  // }

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

  /** **********************************************************************************************
   * ..
   *********************************************************************************************** */
  calcColor(percent: number): number[] {
    const blackRGBValue = 48;
    const whiteRGValue = 238;
    const whieBValue = 233;
    const newR = (blackRGBValue + whiteRGValue) * percent;
    const newG = newR;
    const newB = (blackRGBValue + whieBValue) * percent;
    return [newR, newG, newB];
  }
}
