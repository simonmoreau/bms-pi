import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ViewerModule } from 'ng2-adsk-forge-viewer';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { MarkupComponent } from './markup/markup.component';
import { GraphComponent } from './graph/graph.component';
import { AppService } from './app.service';
import { GoogleChartsModule } from 'angular-google-charts';
import { ViewerComponent } from './viewer/viewer.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    MarkupComponent,
    GraphComponent,
    ViewerComponent
  ],
  imports: [
    BrowserModule,
    ViewerModule,
    AppRoutingModule,
    GoogleChartsModule.forRoot()
  ],
  providers: [AppService],
  bootstrap: [AppComponent]
})
export class AppModule { }
