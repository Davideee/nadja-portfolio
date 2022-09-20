import {
  Component,
  Inject,
  ElementRef,
  OnInit,
  ViewEncapsulation,
} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DialogData, ImageData } from '../model/image';

@Component({
  selector: 'image-dialog',
  templateUrl: 'image-dialog.component.html',
  styleUrls: ['./image-dialog.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ImageDialogComponent {
  image: ImageData;
  imageStyleHeigth: number;
  imageStyleWidth: number;
  imageDescription: string;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    public dialogRef: MatDialogRef<ImageDialogComponent>
  ) {
    this.image = data.image;
    this.imageDescription = data.image.description;
    this.imageStyleHeigth = data.imageHeightPx;
    this.imageStyleWidth = data.imageWidthPx;
  }
}
