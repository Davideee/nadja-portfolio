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
  private REFERENCE_RATIO = 0.202;
  protected scrollHeight = 0;
  private timeout;
  private translates: number[] = [];

  /** **********************************************************************************************
   * ..
   *********************************************************************************************** */
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
    if (window.innerWidth < 768) {
      this.adaptImageParameters();
    }

    fromEvent(window, 'resize').subscribe(() => {
      if (window.innerWidth < 768) {
        this.adaptImageParameters();
      }
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
      this.calcNewImagePositions();
    });

    this.timeout = setTimeout(() => this.getImageSize(), 500);
  }

  /** **********************************************************************************************
   * ..
   *********************************************************************************************** */
  ngOnInit(): void {
    this.loadImagesFile();
  }

  /** **********************************************************************************************
   * ..
   *********************************************************************************************** */
  getImageSize() {
    let height;
    let width;
    for (let i = 0; i < this.imagesData.length; i++) {
      const el = this.elementRef.nativeElement.querySelector(`#image${i}`);
      height = document.getElementById(`image${i}`)?.clientHeight;
      width = document.getElementById(`image${i}`)?.clientWidth;

      if (height && width) {
        this.imagesData[i].imageHeightPx = height;
        this.imagesData[i].imageWidthPx = width;
      } else {
        console.log('Could not retrive image size. Try again.');
        this.timeout = setTimeout(() => this.getImageSize(), 500);
        break;
      }
    }
    this.translates = Array<number>(this.imagesData.length).fill(0);
    // translates array is ready, and we got all image sizes
  }

  /** **********************************************************************************************
   * ..
   *********************************************************************************************** */
  calcNewImagePositions() {
    // let distanceTopToTop;
    // let distanceTopToBottom;
    // const FACTOR = 1.0;

    // const currentWindowPositionTop = this.position / FACTOR;
    // const currentWindowPositionBottom =
    //   this.position + window.innerHeight * FACTOR;

    // console.log('window position top', currentWindowPositionTop);
    // console.log('window position bottom', currentWindowPositionBottom);
    // console.log('current position', this.position);

    const array: string[] = [];

    for (let i = 0; i < this.imagesData.length; i++) {
      // distanceTopToTop = this.imagesData[i].distanceTop + this.translates[i];
      // distanceTopToBottom =
      //   this.imagesData[i].distanceTop -
      //   this.imagesData[i].imageHeightPx +
      //   this.translates[i];
      // const windowFromTop =
      //   currentWindowPositionTop < distanceTopToBottom &&
      //   currentWindowPositionBottom > distanceTopToTop;
      // const windowFromBottom =
      //   currentWindowPositionTop < distanceTopToBottom &&
      //   currentWindowPositionBottom > distanceTopToTop;
      let movement = 1;
      // if (windowFromTop || windowFromBottom) {
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

        this.translates[i] = translateY;
        // console.log(`move ${this.imagesData[i].fileName}: ${translateY}`);
        this.moveImage(translateY, i);
        // console.log(`${this.imagesData[i].fileName} , `, translateY);
        array.push(this.imagesData[i].fileName);
      }
      //   }
    }
    console.log(array);
  }

  /** **********************************************************************************************
   * ..
   *********************************************************************************************** */
  adaptImageParameters(): void {
    this.formatRatio = window.innerHeight / window.innerWidth;
    document.documentElement.clientWidth;
    for (let i = 0; i < this.imagesData.length; i++) {
      this.imagesData[i].distanceTop =
        (this.imagesDataRaw[i].distanceTop * this.REFERENCE_RATIO) /
        this.formatRatio;
    }
  }

  /** **********************************************************************************************
   * ..
   *********************************************************************************************** */
  loadImagesFile() {
    this.http
      .get<ImagesDto>('assets/config/images.json')
      .pipe(take(1))
      .subscribe((data) => {
        this.imagesData = data.images;
      });
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
