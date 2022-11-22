import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatDialogModule } from '@angular/material/dialog';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ScrollContainerComponent } from './scroll-container/scroll-container.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { PortraitComponent } from './portrait/portrait.component';
import { NameContainerComponent } from './name-container/name-container.component';
import { MatIconModule } from '@angular/material/icon';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { SwiperModule } from 'swiper/angular';
import { NameComponent } from './name/name.component';
import { NameMobileComponent } from './name-mobile/name-mobile.component';

@NgModule({
  declarations: [
    AppComponent,
    ScrollContainerComponent,
    PortraitComponent,
    NameContainerComponent,
    NameComponent,
    NameMobileComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatDialogModule,
    MatIconModule,
    HttpClientModule,
    AngularSvgIconModule.forRoot(),
    SwiperModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
