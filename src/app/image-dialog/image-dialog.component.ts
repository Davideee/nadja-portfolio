import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ImageData } from '../model/image';

@Component({
  selector: 'image-dialog',
  templateUrl: 'image-dialog.component.html',
})
export class ImageDialogComponent {
  image: ImageData;
  constructor(@Inject(MAT_DIALOG_DATA) public data: ImageData) {
    this.image = data;
  }
}
