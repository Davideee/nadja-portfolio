import { Component, ElementRef, Input, OnInit, Renderer2 } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';
import { fromEvent } from 'rxjs';

@Component({
  selector: 'app-name-container',
  templateUrl: './name-container.component.html',
  styleUrls: ['./name-container.component.scss'],
})
export class NameContainerComponent {
  @Input() portraitFileName!: string;

  /** **********************************************************************************************
   * ..
   *********************************************************************************************** */
  constructor(
    private elementRef: ElementRef,
    private renderer: Renderer2,
    public dialog: MatDialog,
    private http: HttpClient
  ) {}

  /** **********************************************************************************************
   * ..
   *********************************************************************************************** */
  loadConfigFile() {}
}
