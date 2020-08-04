
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-current',
  templateUrl: './current.component.html',
  styleUrls: ['./current.component.css']
})

export class CurrentComponent implements OnInit {
  @Input() weatherData: any;
  @Input() link: string;
  @Input() inputCity: string;
  @Input() passData;
  city;
  timezone: string;
  currently: any;
  temp: any;
  sum: any;
  humi: any;
  pres: any;
  ws: any;
  visi: any;
  cc: any;
  oz: any;
  humi_zero: any;
  pres_zero: any;
  ws_zero: any;
  visi_zero: any;
  cc_zero: any;
  oz_zero: any;
  ngOnChanges() {
    if (this.weatherData) {
      if (this.passData) {
        this.city = this.inputCity;
        this.timezone = this.weatherData.timezone;
        this.currently = this.weatherData.currently;
        this.temp = this.currently.temperature;
        this.sum = this.currently.summary;
        this.humi = this.currently.humidity;
        this.pres = this.currently.pressure;
        this.ws = this.currently.windSpeed;
        this.visi = this.currently.visibility;
        this.cc = this.currently.cloudCover;
        this.oz = this.currently.ozone;
        if (this.humi == 0) {
          this.humi_zero = true;
        } else {
          this.humi_zero = false;
        }
        if (this.oz == 0) {
          this.oz_zero = true;
        } else {
          this.oz_zero = false;
        }
        if (this.ws == 0) {
          this.ws_zero = true;
        } else {
          this.ws_zero = false;
        }
        if (this.visi == 0) {
          this.visi_zero = true;
        } else {
          this.visi_zero = false;
        }
        if (this.cc == 0) {
          this.cc_zero = true;
        } else {
          this.cc_zero = false;
        }
        if (this.pres == 0) {
          this.pres_zero = true;
        } else {
          this.pres_zero = false;
        }
        this.temp += 0;
        this.temp = this.temp.toFixed(0);
      }
      this.passData = false;

    }
  }
  constructor() { }
  ngOnInit() {
  }

}
