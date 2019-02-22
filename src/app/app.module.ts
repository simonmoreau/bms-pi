import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ViewerModule } from 'ng2-adsk-forge-viewer';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { MarkupComponent } from './markup/markup.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    MarkupComponent
  ],
  imports: [
    BrowserModule,
    ViewerModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
