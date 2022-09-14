import {
  Component,
  ElementRef,
  HostListener,
  ViewEncapsulation,
} from '@angular/core';
import { fromEvent, Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'portfolio-nadja';
  private unsubscribe = new Subject<void>();
  position = 0;

  constructor(private elementRef: ElementRef) {
    fromEvent<Event>(this.elementRef.nativeElement, 'scroll')
      .pipe(takeUntil(this.unsubscribe))
      .subscribe((e: any) => {
        this.position = e.target.scrollTop as number;
      });
  }
}
