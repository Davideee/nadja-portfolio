import { Component, Input, OnInit } from '@angular/core';
import { background } from 'src/shared/animations/background';

@Component({
  selector: 'app-name',
  templateUrl: './name.component.html',
  styleUrls: ['./name.component.scss'],
  animations: [background],
})
export class NameComponent implements OnInit {
  @Input() portraitFileName!: string;
  @Input() animation!: boolean;

  constructor() {}

  ngOnInit(): void {}
}
