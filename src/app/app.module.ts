import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';


import { AppComponent } from './app.component';
import { GeoModule } from './geo/geo.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    GeoModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
