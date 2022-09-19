import { Component, ElementRef, Input, SimpleChange } from '@angular/core';

@Component({
  selector: 'app-name-container',
  templateUrl: './name-container.component.html',
  styleUrls: ['./name-container.component.scss'],
})
export class NameContainerComponent {
  @Input() position: number = 0;
  constructor(private elementRef: ElementRef) {}

  ngOnChanges(changes: SimpleChange): void {
    changes.currentValue;
    // https://stackoverflow.com/questions/16981763/invert-css-font-color-depending-on-background-color
  }
}
