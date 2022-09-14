import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-moveable-image',
  templateUrl: './moveable-image.component.html',
  styleUrls: ['./moveable-image.component.scss'],
})
export class MoveableImageComponent implements OnInit {
  @Input() name!: string;
  @Input() positionX!: number;
  @Input() positionRelativeEnd = 0;
  @Input() imageWidth!: number;

  constructor() {}

  ngOnInit(): void {}
}
