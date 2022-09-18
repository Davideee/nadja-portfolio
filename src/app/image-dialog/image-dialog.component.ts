import { Component, Inject, ElementRef, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DialogData, ImageData } from '../model/image';

@Component({
  selector: 'image-dialog',
  templateUrl: 'image-dialog.component.html',
  styleUrls: ['./image-dialog.component.scss'],
})
export class ImageDialogComponent {
  image: ImageData;
  imageStyleHeigth: string;
  imageStyleWidth: string;
  imageDescription: string;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    public dialogRef: MatDialogRef<ImageDialogComponent>
  ) {
    this.image = data.image;
    this.imageDescription = data.image.description;
    if (data.heightBigger) {
      this.imageStyleHeigth = '80%';
      this.imageStyleWidth = 'auto';
    } else {
      this.imageStyleHeigth = 'auto';
      this.imageStyleWidth = '80%';
    }
  }
}
