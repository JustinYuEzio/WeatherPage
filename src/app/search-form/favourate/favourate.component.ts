
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpEventType, HttpEvent, HttpRequest } from '@angular/common/http'
@Component({
  selector: 'app-favourate',
  templateUrl: './favourate.component.html',
  styleUrls: ['./favourate.component.css']
})
export class FavourateComponent implements OnInit {
  @Output() editDone = new EventEmitter<any>();
  test(city, state) {
    this.editDone.emit(
      {
        city: city,
        state: state
      });
  }
  @Input() link;
  @Input() inputStates;
  @Input() inputCity;
  @Input() inputStreet;
  @Input() fav_data;
  @Input() select_Favourate;
  @Input() getWeather;
  @Input() currentLoc;
  weatherInfo = [];
  noRecord = false;
  index = 0;
  length = localStorage.length;

  ngOnChanges() {
    if (this.length > 0) {
      this.setData();
    } else {
      this.noRecord = true;
    }
  }
  isEven() {
    return this.index % 2 == 0;
  }
  here;
  key;
  // constructor(private localstor: LocalStorageService, private stor: StorageService) { }
  constructor(private http: HttpClient) { }
  setData() {
    for (var i = 0; i < localStorage.length; i++) {
      var temp_key = localStorage.key(i);
      var temp_data = localStorage.getItem(temp_key);
      // console.log(temp_data);
      this.weatherInfo.push(JSON.parse(temp_data));
      // console.log(this.weatherInfo[i].link);
      //console.log(this.weatherInfo[i]);
    }
  }
  deleteItem(key, index) {
    if (localStorage.length == 1) {
      this.noRecord = true;
    }
    localStorage.removeItem(key);
    for (var i = 0; i < this.weatherInfo.length; i++) {
      if (i == index) {
        this.weatherInfo.splice(i, 1);
      }
    }

  }
  ngOnInit() {
  }

}
