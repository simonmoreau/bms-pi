import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ViewerModule } from 'ng2-adsk-forge-viewer';

import { AppComponent } from './app.component';
import { MarkupComponent } from './markup/markup.component';

@NgModule({
  declarations: [
    AppComponent,
    MarkupComponent
  ],
  imports: [
    BrowserModule,
    ViewerModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
