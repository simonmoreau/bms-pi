import { Component, OnInit, Input } from '@angular/core';
import { AppService } from '../app.service';
import { Reading } from '../models/reading.models';
import { GoogleChartComponent } from 'angular-google-charts';
import { ScriptLoaderService } from 'angular-google-charts';
import { GoogleChartPackagesHelper } from 'angular-google-charts';

@Component({
  selector: 'app-graph',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.scss']
})
export class GraphComponent implements OnInit {

  title = 'myGraph';
  type = 'LineChart';
  data: Array<Array<any>>;
  columnNames: Array<string>;
  options: any;
  resize = true;
  errorMessage: string;
  displayed = false;
  myFormatter: any;

  @Input() sensorId: string;

  constructor(private appService: AppService, private loaderService: ScriptLoaderService) { }

  ngOnInit() {

    this.loaderService.onReady.subscribe(() => {

      this.type = GoogleChartPackagesHelper.getPackageForChartName('LineChart');

      this.loaderService.loadChartPackages([this.type]).subscribe(() => {
        // Start creating your chart now
        // Example:
        const formatter = new google.visualization.BarFormat();

        // Formats the columns
        this.myFormatter = [
          { formatter: new google.visualization.NumberFormat({ suffix: ' °C' }), colIndex: 1 },
          { formatter: new google.visualization.NumberFormat({ pattern: '# %' }), colIndex: 2 }
        ];

        this.options = {

          series: {
            0: { targetAxisIndex: 0 },
            1: { targetAxisIndex: 1 }
          },
          vAxes: {
            // Adds titles to each axis.
            0: { title: 'Temperature (°C)', format: '##.# °C' },
            1: { title: 'Humidity (%)', format: '# %' }
          },
          colors: ['#dc3912', '#3366cc']
        };

        this.columnNames = ['Date', 'Temperature', 'Humidity'];
        this.data = [];



        let sensor: string;
        if (this.sensorId) {
          sensor = this.sensorId;
        } else {
          sensor = 'sensor1';
        }

        this.appService.getPastValues(sensor).subscribe(
          readings => {
            this.data = this.GetAveragePerHour(readings);

            this.displayed = true;

          },
          error => (this.errorMessage = error)
        );
      });
    });





    // let formatMS = new google.visualization.NumberFormat({
    //   pattern: '#.# °C'
    // });
    // formatMS.format(this.data, 1);

    // formatMS = new google.visualization.NumberFormat({
    //   pattern: '# %'
    // });
    // formatMS.format(this.data, 2);
  }

  private GetAveragePerHour(readings: Reading[]): Array<Array<any>> {

    function average(data: number[]) {
      const sum = data.reduce((a, b) => a + b, 0);
      return sum / data.length;
    }

    function compare(a: any[], b: any[]) {
      if (a[0] < b[0]) { return -1; }
      if (a[0] > b[0]) {
        return 1;
      }
      return 0;
    }

    const sortedReadings = {};
    let returnArray = [];

    readings.forEach(reading => {
      const date: Date = new Date(reading.timestamp);
      date.setHours(date.getHours() + 1, 0, 0, 0);

      if (sortedReadings[date.toString()]) {
        sortedReadings[date.toString()].push([reading.temperature, reading.humidity / 100]);
      } else {
        sortedReadings[date.toString()] = [[reading.temperature, reading.humidity / 100]];
      }
    });

    Object.keys(sortedReadings).forEach(key => {
      const temperatures: number[] = [];
      const humidity: number[] = [];

      sortedReadings[key].forEach(duet => {
        temperatures.push(duet[0]);
        humidity.push(duet[1]);
      });

      returnArray.push([new Date(key), average(temperatures), average(humidity)]);
    });

    returnArray = returnArray.sort(compare);

    return returnArray;

  }

}
