import { HttpClient } from '@angular/common/http';
// Http is deprecated so instead we are going to use HttpClient
// import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
// import 'rxjs/add/operator/map';

/*
  Generated class for the WeatherProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class WeatherProvider {
  apiKey = 'd7ac391a44dafb46d4e63ba1ee2fa22f';
  url;


  constructor(public http: HttpClient) {
    console.log('Hello WeatherProvider Provider');
    this.url = 'http://api.openweathermap.org/data/2.5/weather?';

  }
  // api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}
  // Change given parameters to change the location of weather forecast
  getWeather(lat, lon) {
    return this.http.get(this.url + 'lat=' + lat + '&lon=' + lon + '&APPID=d7ac391a44dafb46d4e63ba1ee2fa22f');
    // .map(res => res.json()); this works with deprecated version
  }

}
