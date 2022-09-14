import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ScrollContainerComponent } from './scroll-container/scroll-container.component';
import { MoveableImageComponent } from './moveable-image/moveable-image.component';

@NgModule({
  declarations: [
    AppComponent,
    ScrollContainerComponent,
    MoveableImageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
