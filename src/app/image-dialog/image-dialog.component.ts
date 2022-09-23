import {
  Component,
  Inject,
  ElementRef,
  ViewEncapsulation,
} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { fromEvent } from 'rxjs';
import { DialogData, ImageData } from '../model/image';

@Component({
  selector: 'image-dialog',
  templateUrl: 'image-dialog.component.html',
  styleUrls: ['./image-dialog.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ImageDialogComponent {
  image: ImageData;
  imageStyleHeigth: string;
  imageStyleWidth: string;
  timeout: any;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    public dialogRef: MatDialogRef<ImageDialogComponent>,
    private elementRef: ElementRef
  ) {
    this.timeout = setTimeout(() => {
      fromEvent(window, 'click').subscribe((e) => {
        this.dialogRef.close();
      });
    }, 200);

    this.image = data.image;
    if (data.heightBigger) {
      this.imageStyleHeigth = '80vh';
      this.imageStyleWidth = 'auto';
    } else {
      this.imageStyleWidth = '80vw';
      this.imageStyleHeigth = 'auto';
    }
    fromEvent(this.elementRef.nativeElement, 'click').subscribe((e) => {
      this.dialogRef.close();
    });
  }

  onDestroy() {
    clearTimeout(this.timeout);
  }
}
