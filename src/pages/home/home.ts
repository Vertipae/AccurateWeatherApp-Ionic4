import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { WeatherProvider } from '../../providers/weather/weather';
import { Geolocation } from '@ionic-native/geolocation';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  weather: any;
  locationAllowed: Boolean = true;
  // location is an object
  // define properties lat and lon
  // location: {
  //   lat: any,
  //   lon: any
  // }


  constructor(public navCtrl: NavController, private weatherProvider: WeatherProvider, private geo: Geolocation) {

  }
  // Manually setting lat and lon inside to ionViewWillEnter()
  ionViewWillEnter() {
    var lat;
    var lon;
    this.geo.getCurrentPosition().then((resp) => {
      if (resp) {
        console.log(resp.coords.latitude)
        lat = resp.coords.latitude
        lon = resp.coords.longitude
      } else {

        lat = '25.763172';
        lon = '-80.194450';

      }
      this.weatherProvider.getWeather(lat, lon)
        .subscribe(weather => {
          console.log(weather);
          weather.main.temp = Math.round((weather.main.temp - 273.15)*10)/10;
          this.weather = weather;


        });

    }).catch((error) => {
      console.log('Error getting location', error);
      lat = '25.763172';
      lon = '-80.194450';

      this.weatherProvider.getWeather(lat, lon)
        .subscribe(weather => {
          console.log(weather);
          weather.main.temp = Math.round((weather.main.temp - 273.15)*10)/10;
          this.weather = weather;
          this.locationAllowed = false;

        });
    });

  }

}
