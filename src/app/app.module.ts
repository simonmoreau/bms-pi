import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ViewerModule } from 'ng2-adsk-forge-viewer';

import { AppComponent } from './app.component';
import { MarkupComponent } from './markup/markup.component';
import { App } from './app.routing.module';

@NgModule({
  declarations: [
    AppComponent,
    MarkupComponent
  ],
  imports: [
    BrowserModule,
    ViewerModule,
    App.RoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
