import { Component, OnInit, Input, OnChanges  } from '@angular/core';
import { AppService} from '../app.service';
import { Reading} from '../models/reading.models';

@Component({
  selector: 'app-markup',
  templateUrl: './markup.component.html',
  styleUrls: ['./markup.component.scss']
})
export class MarkupComponent implements OnInit, OnChanges {

  positionLeft: number;
  positionTop: number;
  isPanelDisplayed: boolean;
  sensorName: string;
  humidity: number;
  temperature: number;
  errorMessage: string;

  @Input() position: any;
  @Input() sensorId: string;

  constructor(private appService: AppService) {
    this.positionLeft = 100; // this.position.x;
    this.positionTop = 100; // this.position.y;
    this.sensorName = 'Sensor 1';
    this.isPanelDisplayed = false;
   }

  ngOnInit() {
    this.positionLeft = this.position.x;
    this.positionTop = this.position.y;

    this.appService.getLastValue(this.sensorId).subscribe(
      reading => {
        this.humidity = Math.round(reading.humidity);
        this.temperature = Math.round(reading.temperature * 10) / 10 ;
      },
      error => (this.errorMessage = error)
    );
  }

  ngOnChanges() {
    this.positionLeft = this.position.x;
    this.positionTop = this.position.y;
  }

  displayPanel() {
    this.isPanelDisplayed = !this.isPanelDisplayed;
    console.log(this.position);
  }

}
