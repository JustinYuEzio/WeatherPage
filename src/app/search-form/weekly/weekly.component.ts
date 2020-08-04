
import { HttpClient, HttpParams, HttpRequest, HttpEvent, HttpEventType } from '@angular/common/http';
import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import * as CanvasJS from '../canvasjs-2.3.2/canvasjs.min';
@Component({
  selector: 'app-weekly',
  templateUrl: './weekly.component.html',
  styleUrls: ['./weekly.component.css']
})

export class WeeklyComponent implements OnInit {
  private daily_url = "http://justin-csci571-hw8fornodejs.us-east-2.elasticbeanstalk.com/dailydata";
  constructor(private http: HttpClient) { }
  @ViewChild("test", { static: false }) divView: ElementRef;
  @Input() resultData: any
  @Input() inputStreet;
  @Input() inputStates;
  @Input() inputCity;
  @Input() showWeek;
  @Input() lat;
  @Input() lng;
  weeklyData: any;
  locationData;
  weatherData = this.resultData;
  date = [];
  inputdata = [
  ];
  ngOnInit() {

  }


  drawChart() {
    this.inputdata.reverse();
    var weatherData = this.weatherData;
    var lat = this.lat;
    var lng = this.lng;
    var divView = this.divView;
    let chart = new CanvasJS.Chart("chartContainer", {
      animationEnabled: true,
      dataPointWidth: 20,
      legend: {
        horizontalAlign: "center",
        verticalAlign: "top",
      },
      toolTip: {
        fontColor: "black",
      },
      title: {
        text: "Weekly Weather"
      },
      axisX: {
        title: "Days"
      },
      axisY: {
        includeZero: false,
        title: "Temperature in Fahrenheit",
        interval: 5,
      },
      data: [{
        click: (e) => {
          //console.log(e);
          var data = weatherData.daily.data;
          var index = 7 - e.dataPointIndex;
          data = data[index];
          var time = data.time;
          this.getData(lat, lng, time);
          divView.nativeElement.click();;
        },
        type: "rangeBar",
        showInLegend: true,
        yValueFormatString: "#0",
        indexLabel: "{y[#index]}",
        legendText: "Day wise temperature range",
        dataPoints: this.inputdata,
        color: 'rgb(157, 207, 238)',
      }]
    });
    setTimeout(() => {
      chart.render();
    }, 700);

  }
  setData() {
    this.weeklyData = this.weatherData.daily.data;
    this.weeklyData.forEach(day => {
      var temp_date = day.time;
      temp_date = new Date(temp_date * 1000);
      var month = temp_date.getMonth() + 1;
      var temp_day = temp_date.getDate();
      var year = temp_date.getYear();
      temp_date = temp_day + "/" + month + "/" + year;
      this.temp.push([day.temperatureLow, day.temperatureHigh]);
      this.date.push(temp_date);
      var templ = day.temperatureLow;
      templ += 0;
      templ = templ.toFixed(0);
      var temph = day.temperatureHigh;
      temph += 0;
      temph = temph.toFixed(0);
      var temp_data = {
        y: [day.temperatureLow, day.temperatureHigh],
        label: temp_date,
      }
      this.inputdata.push(temp_data);
    })
  }

  ngOnChanges() {
    //console.log(this.resultData);
    if (this.resultData) {
      this.weatherData = this.resultData;
      if (this.showWeek) {
        this.setData();
        this.drawChart();
      }
    }

  }
  dailyDate;
  dailyCity;
  dailyTemp;
  dailyIcon;
  dailySum;
  dailyPer;
  dailyRai;
  dailyWs;
  dailyHum;
  dailyVisi;
  temp = [];
  dailyData: any;
  getData(lat, lng, time) {
    var params = new HttpParams().set("lat", lat).set("lng", lng).set("time", time);
    const req = new HttpRequest('GET', this.daily_url,
      {
        params,
        reportProgress: true,
      });
    this.http.request(req).subscribe((event: HttpEvent<any>) => {
      switch (event.type) {
        case HttpEventType.Response:
          this.dailyData = event.body;
          this.dailyData = this.dailyData.currently;
          this.dailyDate = this.dailyData.time;
          this.dailyCity = this.inputCity;
          this.dailyTemp = this.dailyData.temperature;
          this.dailyTemp += 0;
          this.dailyTemp = this.dailyTemp.toFixed(0);
          if (this.dailyData.icon == "rain") {
            this.dailyIcon = "https://cdn3.iconfinder.com/data/icons/weather-344/142/rain-512.png";
          } else if (this.dailyData.icon == "clear-night" || this.dailyData.icon == "clear-day") {
            this.dailyIcon = "https://cdn3.iconfinder.com/data/icons/weather-344/142/sun-512.png";
          } else if (this.dailyData.icon == "snow") {
            this.dailyIcon = "https://cdn3.iconfinder.com/data/icons/weather-344/142/snow-512.png";
          } else if (this.dailyData.icon == "sleet") {
            this.dailyIcon = "https://cdn3.iconfinder.com/data/icons/weather-344/142/lightning-512.png";
          } else if (this.dailyData.icon == "wind") {
            this.dailyIcon = "https://cdn4.iconfinder.com/data/icons/the-weather-is-nice-today/64/weather_10-512.png";
          } else if (this.dailyData.icon == "fog") {
            this.dailyIcon = "https://cdn3.iconfinder.com/data/icons/weather-344/142/cloudy-512.png";
          } else if (this.dailyData.icon == "cloudy") {
            this.dailyIcon = "https://cdn3.iconfinder.com/data/icons/weather-344/142/cloud-512.png";
          } else {
            this.dailyIcon = "https://cdn3.iconfinder.com/data/icons/weather-344/142/sunny-512.png";
          }
          var temp_dailyDate = new Date(this.dailyDate * 1000);
          var day = temp_dailyDate.getDate();
          var month = temp_dailyDate.getMonth() + 1;
          var year = temp_dailyDate.getFullYear();
          this.dailyDate = day + "/" + month + "/" + year;
          this.dailySum = this.dailyData.summary;
          this.dailyPer = this.dailyData.precipIntensity;
          this.dailyPer += 0;
          this.dailyPer = this.dailyPer.toFixed(0);
          this.dailyRai = this.dailyData.precipProbability;
          this.dailyWs = this.dailyData.windSpeed;
          this.dailyWs += 0;
          this.dailyWs = this.dailyWs.toFixed(2);
          this.dailyHum = this.dailyData.humidity;
          this.dailyHum *= 100;
          this.dailyHum = this.dailyHum.toFixed(0);
          this.dailyVisi = this.dailyData.visibility;
          this.dailyVisi += 0;
          this.dailyVisi = this.dailyVisi.toFixed(2);
        // this.getLink();
      }
    })
  }
}
