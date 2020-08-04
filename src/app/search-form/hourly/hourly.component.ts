import { ViewChild, ElementRef } from '@angular/core';
// import { Data } from './../../server/data';
import { Chart } from '../../../../node_modules/chart.js'
import { Component, OnInit, Input } from '@angular/core';
import { NONE_TYPE } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-hourly',
  templateUrl: './hourly.component.html',
  styleUrls: ['./hourly.component.css']
})
export class HourlyComponent implements OnInit {

  @ViewChild("test", { static: false }) divView: ElementRef;
  @ViewChild('childButton', { static: false }) childButton: ElementRef;
  @ViewChild("chart", { static: false }) chartView: ElementRef;

  chart: Chart;

  showChart_temp() {
    var notShow = function (e, legendItem) {
    }
    setTimeout(() => {
      this.chart = new Chart("chart", {
        type: 'bar',
        data: {
          labels: this.barChartLabels,
          datasets: [
            {
              data: this.temp,
              borderColor: '#00AEFF',
              backgroundColor: 'rgb(166, 207, 238)',
              label: 'Temperature',

            }
          ]
        },
        options: {
          legend: {
            display: true,
            onClick: notShow,
          },
          scales: {
            xAxes: [{
              display: true,
              scaleLabel: {
                display: true,
                labelString: 'Time difference from current hour',
                fontSize: 13,
              },
            }],
            yAxes: [{
              ticks: {
                suggestedMax: Math.floor(Math.max.apply(0, this.temp)) + 3,
                stepSize: 5,
              },
              display: true,
              scaleLabel: {
                display: true,
                labelString: 'Fahrenheit',
                fontSize: 13,
              },
            }],
          }
        }
      })
    }, 400);
    if (this.chart) {
      this.chart.destroy();
    }

  }
  showChart_pres() {
    setTimeout(() => {
      this.chart = new Chart("chart", {
        type: 'bar',
        data: {
          labels: this.barChartLabels,
          datasets: [
            {
              data: this.pres,
              borderColor: '#00AEFF',
              backgroundColor: 'rgb(166, 207, 238)',
              label: 'pressure',
            }
          ]
        },
        options: {
          legend: {
            display: true,
            onClick: function (e, legendItem) {
            }
          },
          scales: {
            xAxes: [{
              display: true,
              scaleLabel: {
                display: true,
                labelString: 'Time difference from current hour',
                fontSize: 13,
              },
            }],
            yAxes: [{
              ticks: {
                suggestedMax: Math.floor(Math.max.apply(0, this.pres)) + 2,
                suggestedMin: Math.floor(Math.min.apply(1050, this.pres)) + 2,
                stepSize: 2,
              },
              display: true,
              scaleLabel: {
                display: true,
                labelString: 'Millibars',
                fontSize: 13,
              },
            }],
          }
        }
      })
    }, 200);
    this.chart.destroy();
  }
  showChart_humi() {
    setTimeout(() => {
      this.chart = new Chart("chart", {
        type: 'bar',
        data: {
          labels: this.barChartLabels,
          datasets: [
            {
              data: this.humi,
              borderColor: '#00AEFF',
              backgroundColor: 'rgb(166, 207, 238)',
              label: 'humidity',
            }
          ]
        },
        options: {
          legend: {
            display: true,
            onClick: function (e, legendItem) {
            }
          },
          scales: {
            xAxes: [{
              display: true,
              scaleLabel: {
                display: true,
                labelString: 'Time difference from current hour',
                fontSize: 13,
              },
            }],
            yAxes: [{
              ticks: {
                suggestedMax: Math.floor(Math.max.apply(0, this.humi)) + 5,
                suggestedMin: Math.floor(Math.min.apply(20, this.humi)) - 5,
                stepSize: 10,
              },
              display: true,
              scaleLabel: {
                display: true,
                labelString: '% Humidity',
                fontSize: 13,
              },
            }],
          }
        }
      })
    }, 200);
    this.chart.destroy();
  }
  showChart_oz() {
    setTimeout(() => {
      this.chart = new Chart("chart", {
        type: 'bar',
        data: {
          labels: this.barChartLabels,
          datasets: [
            {
              data: this.oz,
              borderColor: '#00AEFF',
              backgroundColor: 'rgb(166, 207, 238)',
              label: 'ozone',
            }
          ]
        },
        options: {
          legend: {
            display: true,
            onClick: function (e, legendItem) {
            }
          },
          scales: {
            xAxes: [{
              display: true,
              scaleLabel: {
                display: true,
                labelString: 'Time difference from current hour',
                fontSize: 13,
              },
            }],
            yAxes: [{
              ticks: {
                // max: Math.max.apply(this.temp, );
                // //stepSize: 5,
                //max: 
                suggestedMax: Math.floor(Math.max.apply(0, this.oz)) + 1,
                suggestedMin: Math.floor(Math.min.apply(200, this.oz)) - 1,
                stepSize: 6
              },
              display: true,
              scaleLabel: {
                display: true,
                labelString: 'Dobson Units',
                fontSize: 13,
              },
            }],
          }
        }
      })
    }, 200);
    this.chart.destroy();
  }
  showChart_visi() {
    setTimeout(() => {
      this.chart = new Chart("chart", {
        type: 'bar',
        data: {
          labels: this.barChartLabels, // your labels array
          datasets: [
            {
              data: this.visi, // your data array
              borderColor: '#00AEFF',
              backgroundColor: 'rgb(166, 207, 238)',
              label: 'visibility',
            }
          ]
        },
        options: {
          legend: {
            display: true,
            onClick: function (e, legendItem) {
            }
          },
          scales: {
            xAxes: [{
              display: true,
              scaleLabel: {
                display: true,
                labelString: 'Time difference from current hour',
                fontSize: 13,
              },
            }],
            yAxes: [{
              ticks: {
                suggestedMax: Math.floor(Math.max.apply(0, this.visi)) + 2,
                suggestedMin: Math.floor(Math.min.apply(2, this.visi)) - 2,
                stepSize: 2,
                //max: 

              },
              display: true,
              scaleLabel: {
                display: true,
                labelString: 'Miles (Maximum 10)',
                fontSize: 11,
              },
            }],
          }
        }
      })
    }, 200);
    this.chart.destroy();
  }
  showChart_ws() {
    setTimeout(() => {
      this.chart = new Chart("chart", {
        type: 'bar',
        data: {
          labels: this.barChartLabels, // your labels array
          datasets: [
            {
              data: this.ws, // your data array
              borderColor: '#00AEFF',
              backgroundColor: 'rgb(166, 207, 238)',
              label: 'windSpeed',
            }
          ]
        },
        options: {
          legend: {
            display: true,
            onClick: function (e, legendItem) {
            }
          },
          scales: {
            xAxes: [{
              display: true,
              scaleLabel: {
                display: true,
                labelString: 'Time difference from current hour',
                fontSize: 13,
              },
            }],
            yAxes: [{
              ticks: {
                suggestedMax: Math.floor(Math.max.apply(0, this.ws)) + 2,
                stepSize: 1.5,
                // //stepSize: 5,
                //max: 
              },
              display: true,
              scaleLabel: {
                display: true,
                labelString: 'Miles (Maximum 10)',
                fontSize: 13,
              },
            }],
          }
        }
      })
    }, 200);
    this.chart.destroy();
  }
  @Input() weatherData;
  @Input() tempShow;
  @Input() selected;
  constructor() {
  }
  ngOnInit() {
  }
  hourlyData: any;
  timezone: string;
  temp = [];
  humi = [];
  visi = [];
  pres = [];
  oz = [];
  ws = [];
  hour = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23];
  ngOnChanges() {
    if (this.weatherData) {
      this.setData();
    }
  }
  choose() {
    switch (this.selected) {
      case "temp":
        this.showChart_temp();
        break;
      case "pres":
        this.showChart_pres();
        break;
      case "humi":
        this.showChart_humi();
        break;
      case "oz":
        this.showChart_oz();
        break;
      case "ws":
        this.showChart_ws();
        break;
      case "visi":
        this.showChart_visi();
        break;
    }
  }
  maxTemp = '';
  maxHumi = '';
  maxVisi = '';
  maxPres = '';
  maxOz = '';
  maxWs = '';
  setData() {
    this.hourlyData = this.weatherData.hourly.data;
    for (var i = 0; i < 24; i++) {
      var hour = this.hourlyData[i];
      var temp_temp = hour.temperature;
      var temp_humi = hour.humidity;
      var temp_visi = hour.visibility;
      var temp_ws = hour.windSpeed;
      var temp_oz = hour.ozone;
      var temp_pres = hour.pressure;
      temp_humi *= 100;
      temp_temp += 0;
      temp_temp = temp_temp.toFixed(0);
      this.temp.push(hour.temperature);
      this.humi.push(temp_humi);
      this.pres.push(temp_pres);
      this.visi.push(temp_visi);
      this.oz.push(temp_oz);
      this.ws.push(temp_ws);
      if (temp_temp > this.maxTemp) {
        this.maxTemp = temp_temp;
      }

      if (temp_humi > this.maxHumi) {
        this.maxHumi = temp_humi;
      }

      if (temp_oz > this.maxOz) {
        this.maxOz = temp_oz;
      }

      if (temp_visi > this.maxVisi) {
        this.maxVisi = temp_visi;
      }
      if (temp_ws > this.maxWs) {
        this.maxWs = temp_ws;
      }
      if (temp_pres > this.maxPres) {
        this.maxPres = temp_pres;
      }
    }
  }
  barChartOptions: any;
  barChartData: any;
  public barChartOptions_temp = {
    scaleShowVerticalLines: false,
    responsive: true,
    scales: {
      xAxes: [{
        scaleLabel: {
          display: true,
          labelString: 'Time difference from current hour'
        }
      }],
      yAxes: [{
        scaleLabel: {
          display: true,
          labelString: 'Fahrenheit',
          scaleSteps: 5,
        }
      }]
    }
  };
  public barChartLabels = ['0', '1', '2', '3', '4', '5', '6', '7',
    '8', '9', '10', '11', '12', '13', '14',
    '15', '16', '17', '18', '19', '20', '21', '22', '23'];
  public barChartType = 'bar';
  public barChartLegend = true;
  public barChartData_temp = [
    {
      data: this.temp,
      label: 'Temperature',
      backgroundColor: 'rgb(166, 207, 238)',
      hoverBackgroundColor: 'rgb(105,137,160)'
    }
  ];
  public barChartData_visi = [
    {
      data: this.visi,
      label: 'visibility',
      backgroundColor: 'rgb(166, 207, 238)',
      hoverBackgroundColor: 'rgb(105,137,160)'
    }
  ];
  public barChartData_humi = [
    {
      data: this.humi,
      label: 'Humidity',
      backgroundColor: 'rgb(166, 207, 238)',
      hoverBackgroundColor: 'rgb(105,137,160)'
    }
  ];
  public barChartData_ws = [
    {
      data: this.ws,
      label: 'windSpeed',
      backgroundColor: 'rgb(166, 207, 238)',
      hoverBackgroundColor: 'rgb(105,137,160)'
    }
  ];
  public barChartData_oz = [
    {
      data: this.oz,
      label: 'Ozone',
      backgroundColor: 'rgb(166, 207, 238)',
      hoverBackgroundColor: 'rgb(105,137,160)'
    }
  ];
  public barChartData_pres = [
    {
      data: this.pres,
      label: 'pressure',
      backgroundColor: 'rgb(166, 207, 238)',
      hoverBackgroundColor: 'rgb(105,137,160)'
    }
  ];
  public barChartOptions_humi = {
    scaleShowVerticalLines: false,
    responsive: true,
    scales: {
      yAxes: [{
        scaleLabel: {
          display: true,
          labelString: '% Humidity',
        },
        ticks: {
          steps: 10,
          stepValue: 6,
        }
      }]
    }
  };
  public barChartOptions_pres = {
    scaleShowVerticalLines: false,
    responsive: true,
    scales: {
      yAxes: [{
        scaleLabel: {
          display: true,
          labelString: 'Millibars',
        }
      }]
    }
  };
  public barChartOptions_visi = {
    scaleShowVerticalLines: false,
    responsive: true,
    scales: {
      yAxes: [{
        scaleLabel: {
          display: true,
          labelString: 'Miles (Maximum 10)',
        }
      }]
    }
  };
  public barChartOptions_ws = {
    scaleShowVerticalLines: false,
    responsive: true,
    scales: {
      yAxes: [{
        scaleLabel: {
          display: true,
          labelString: 'Miles per Hour',
          scaleSteps: 5,
        }
      }]
    }
  };
  public barChartOptions_oz = {
    scaleShowVerticalLines: false,
    responsive: true,
    scales: {
      yAxes: [{
        scaleLabel: {
          display: true,
          labelString: 'Dobson Units',
          scaleSteps: 5,
        }
      }]
    }
  };

}

