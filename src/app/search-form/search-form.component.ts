
import { HourlyComponent } from './hourly/hourly.component';
import { Component, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpEventType, HttpEvent, HttpRequest } from '@angular/common/http'
@Component({
  selector: 'app-search-form',
  templateUrl: './search-form.component.html',
  styleUrls: ['./search-form.component.css']
})

export class SearchFormComponent implements OnInit {
  @ViewChild(HourlyComponent, { static: false }) childButton: HourlyComponent;
  message: string;
  constructor(private http: HttpClient) {
  }
  ngOnInit() {
  }
  tempStr;
  tempCity;
  tempSta;
  passData = false;
  keepTempData() {
    if (!this.inputStates) {
      this.tempSta = "Select State"
    } else {
      this.tempSta = this.inputStates;
    }
    this.tempStr = this.inputStreet;

    this.tempCity = this.inputCity;
  }
  inputStreet = "";
  inputCity = "";
  inputStates = "";
  cityData: any;
  dataOfCity: any;
  dataOfWeather: any;
  weatherData: any;
  locationData: any;
  dataOfLocation: any;
  percentDone = "";
  barShow = false;
  fetching = false;
  done = false;
  lat = "";
  lng = "";
  resultShow = false;
  form_input: any;
  inputInvalid = false;
  currentLocData: any;
  currentLoc = false;
  fav_data = {
    link: '',
    city: '',
    state: ''
  }
  invalidTab = false;
  emptyTab = false;
  favtab = false;
  currentTab = false;
  private auto_url = "http://weathersearch-env.eba-vmsvqibd.us-west-1.elasticbeanstalk.com/auto_complete";
  private location_url = "http://weathersearch-env.eba-vmsvqibd.us-west-1.elasticbeanstalk.com/location";
  private weather_url = "http://weathersearch-env.eba-vmsvqibd.us-west-1.elasticbeanstalk.com/weather";
  private logo_url = "http://weathersearch-env.eba-vmsvqibd.us-west-1.elasticbeanstalk.com/logo";
  linkData: any;
  link = "";
  fav = false;
  res = true;
  hourlyTabShow = false;
  select_Favourate = false;
  selected = "";
  de_favourate() {
    this.select_Favourate = !this.select_Favourate;
    localStorage.removeItem(this.inputCity);
  }

  favourate() {
    this.select_Favourate = !this.select_Favourate;
    this.fav_data.city = this.inputCity;
    this.fav_data.link = this.link;
    this.fav_data.state = this.inputStates;
    localStorage.setItem(this.fav_data.city, JSON.stringify(this.fav_data));
  }

  showWeek = false;
  showWeekTab() {
    this.showWeek = true;
    this.selected = "";
    this.showTemp = false;
  }
  showTemp = false;
  showTempTab() {
    this.showTemp = true;
    this.showWeek = false;
    this.selected = "temp";
    this.childButton.childButton.nativeElement.click();
  }

  empty = false;
  showResults() {
    this.fav = false;
    this.res = true;
    this.emptyTab = false;
    this.favtab = false;
    this.showWeek = false;
    this.showTemp = false;
    if (localStorage.getItem(this.inputCity) == null) {
      this.select_Favourate = false;
    } else {
      this.select_Favourate = true;
    }
    if (!this.invalid) {
      this.currentTab = true;
    } else {
      this.invalidTab = true;
    }
  }
  not_showResults() {
    this.fav = true;
    this.res = false;
    this.currentTab = false;
    this.invalidTab = false;
    length = localStorage.length;
    if (localStorage.getItem(this.inputCity) == null) {
      this.select_Favourate = false;
    } else {
      this.select_Favourate = true;
    }
    if (length != 0) {
      this.empty = false;
    } else {
      this.empty = true;
    }
    if (this.empty) {
      this.emptyTab = true;
    } else {
      this.favtab = true;
    }

  }

  showHourlyTab() {
    this.hourlyTabShow = true;
  }

  showFavourates() {
    this.fav = true;
    this.res = false;
    this.currentTab = false;
    this.invalidTab = false;
    length = localStorage.length;
    if (length != 0) {
      this.empty = false;
    } else {
      this.empty = true;
    }
    if (this.empty) {
      this.emptyTab = true;
    } else {
      this.favtab = true;
    }

  }
  not_showFavourates() {
    this.fav = false;
    this.res = true;
    this.emptyTab = false;
    this.favtab = false;
    if (!this.invalid) {
      this.currentTab = true;
    } else {
      this.invalidTab = true;
    }
  }
  twitterUrl = "https://twitter.com/intent/tweet?text=";
  weatherInformation = "";

  twitterIntent() {
    window.open(this.twitterUrl + this.weatherInformation, "_blank");
  }
  getCity() {
    var params = new HttpParams().set("city", this.inputCity);
    this.http.request("GET", this.auto_url, { params }).subscribe(data => {
      this.dataOfCity = data;
      this.cityData = this.dataOfCity.predictions;
    });
  }
  getCurrentLocation() {
    this.currentLoc = true;
    this.keepTempData();
    this.http.get('http://ip-api.com/json').subscribe(data => {
      this.currentLocData = data;
      this.lat = this.currentLocData.lat;
      this.lng = this.currentLocData.lon;
      this.inputCity = this.currentLocData.city;
      this.inputStates = this.currentLocData.region;
    })
  }
  clearAll() {
    this.favtab = false;
    this.emptyTab = false;
    this.currentTab = false;
    this.invalidTab = false;
    this.inputStates = "";
    this.fetching = false;
    this.done = false;
  }
  invalid = true;
  getWeatherFromFav(msg) {
    this.inputCity = msg.city;
    var city = msg.city;
    var state = msg.state;
    this.fetching = true;
    this.currentTab = false;
    this.favtab = false;
    this.invalidTab = false;
    this.emptyTab = false;
    this.showTemp = false;
    this.showWeek = false;
    var input = "[" + "," + city + "," + state + "]";
    var params = new HttpParams().set("address", input);
    const req = new HttpRequest('GET', this.location_url,
      {
        params,
        reportProgress: true
      });
    this.http.request(req).subscribe((event: HttpEvent<any>) => {
      switch (event.type) {
        case HttpEventType.Response:
          if (event.body.results.length != 0) {
            this.locationData = event.body.results[0].geometry.location;
            this.lat = this.locationData.lat;
            this.lng = this.locationData.lng;
            var params = new HttpParams().set("lat", this.lat).set("lng", this.lng);
            console.log(params);
            const req = new HttpRequest('GET', this.weather_url,
              {
                params,
                reportProgress: true,
              });
            //console.log(req);
            this.http.request(req).subscribe((event: HttpEvent<any>) => {
              switch (event.type) {
                case HttpEventType.Response:
                  this.weatherData = event.body;
                  this.invalid = false;
                  this.fav = false;
                  this.res = true;
                  var currently = this.weatherData.currently;
                  this.weatherInformation = "The current temperature at " + this.inputCity + " is " + currently.temperature + "℉. The weather conditions are " + currently.summary + ".%0a"
                    + encodeURIComponent("#CSCI571WeatherSearch");
                  this.resultShow = true;
                  this.getLink();
                  if (localStorage.getItem(this.inputCity) == null) {
                    this.select_Favourate = false;
                  } else {
                    this.select_Favourate = true;
                  }
              }
            })
            break;
          } else {
            this.invalid = true;
            this.res = true;
            this.fav = false;
            this.invalidTab = true;
            this.currentTab = false;
            this.done = false;
            this.fetching = false;
          }
      }
    }
    )
  }
  getWeather() {
    this.passData = true;
    this.fetching = true;
    this.currentTab = false;
    this.favtab = false;
    this.invalidTab = false;
    this.emptyTab = false;
    this.showWeek = false;
    this.hourlyTabShow = false;
    if (this.currentLoc) {
      this.getCurrentLocation();
      var params = new HttpParams().set("lat", this.lat).set("lng", this.lng);
      const req = new HttpRequest('GET', this.weather_url,
        {
          params,
          reportProgress: true,
        });
      this.http.request(req).subscribe((event: HttpEvent<any>) => {
        switch (event.type) {
          case HttpEventType.Response:
            this.weatherData = event.body;
            var currently = this.weatherData.currently;
            this.weatherInformation = "The current temperature at " + this.inputCity + " is " + currently.temperature + "℉. The weather conditions are " + currently.summary + ".%0a"
              + encodeURIComponent("#CSCI571WeatherSearch");
            this.fav = false;
            this.res = true;
            this.invalid = false;
            //this.currentTab = true;
            this.getLink();
            this.currentLoc = false;
        }
      })
    } else {
      var str = this.inputStreet;
      var city = this.inputCity;
      var state = this.inputStates;
      var input = "[" + str + "," + city + "," + state + "]";
      var params = new HttpParams().set("address", input);
      //console.log("location params: " + params);
      const req = new HttpRequest('GET', this.location_url,
        {
          params,
          reportProgress: true
        });
      this.http.request(req).subscribe((event: HttpEvent<any>) => {
        //console.log(event);
        switch (event.type) {
          case HttpEventType.Response:
            //console.log('😺 Done!', event.body);
            if (event.body.results.length != 0) {
              this.locationData = event.body.results[0].geometry.location;
              this.lat = this.locationData.lat;
              this.lng = this.locationData.lng;
              var params = new HttpParams().set("lat", this.lat).set("lng", this.lng);
              //console.log(params);
              const req = new HttpRequest('GET', this.weather_url,
                {
                  params,
                  reportProgress: true,
                });
              //console.log(req);
              this.http.request(req).subscribe((event: HttpEvent<any>) => {
                switch (event.type) {
                  case HttpEventType.Response:
                    this.weatherData = event.body;
                    this.invalid = false;
                    this.fav = false;
                    this.res = true;
                    var currently = this.weatherData.currently;
                    this.weatherInformation = "The current temperature at " + this.inputCity + " is " + currently.temperature + "℉. The weather conditions are " + currently.summary + ".%0a"
                      + encodeURIComponent("#CSCI571WeatherSearch");
                    this.resultShow = true;
                    this.getLink();
                    this.currentLoc = false;
                    if (localStorage.getItem(this.inputCity) == null) {
                      this.select_Favourate = false;
                    } else {
                      this.select_Favourate = true;
                    }
                }
              })
              break;
            } else {
              this.invalid = true;
              this.res = true;
              this.fav = false;
              this.invalidTab = true;
              this.currentTab = false;
              this.done = false;
              this.fetching = false;
            }
        }
      }
      )
    }
  }

  getLink() {
    var params = new HttpParams().set("state", this.inputStates);
    const req = new HttpRequest('GET', this.logo_url, { params, reportProgress: true });
    this.http.request(req).subscribe((event: HttpEvent<any>) => {
      switch (event.type) {
        case HttpEventType.DownloadProgress:
          //console.log("in progress")
          this.percentDone = Math.round(100 * event.loaded / event.total) + "%";
          if (this.percentDone == "80%") {
            this.done = true;
          }
          break;
        case HttpEventType.Response:
          this.linkData = event.body;
          this.currentTab = true;
          this.link = this.linkData.items[0].link;
          this.fetching = false;
          console.log(this.fetching)
          this.done = false;
          break;
      }
    })
  }

}
