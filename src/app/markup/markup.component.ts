import { Component, OnInit, Input, OnChanges  } from '@angular/core';

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

  @Input() position: any;

  constructor() {
    this.positionLeft = 100; // this.position.x;
    this.positionTop = 100; // this.position.y;
    this.sensorName = 'Sensor 1';
    this.isPanelDisplayed = false;
   }

  ngOnInit() {
    this.positionLeft = this.position.x;
    this.positionTop = this.position.y;
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
