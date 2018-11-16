import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { WeatherProvider } from '../../providers/weather/weather';
import { Geolocation } from '@ionic-native/geolocation';
import { Storage } from '@ionic/storage';
import { timer } from 'rxjs/observable/timer';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  // ngModels variables
  weather: any;
  locationAllowed: Boolean = true;
  message: string;
  // value is defined by searchbar in home.html
  search: string;

  constructor(public navCtrl: NavController,
    private weatherProvider: WeatherProvider,
    private geo: Geolocation,
    private storage: Storage) {

  }

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
          // Changing Kelvin to Celius and rounding to proximity of 1 decimal (you don't need to do this if you gave celsius as parameter in weather.ts)
          // weather.main.temp = Math.round((weather.main.temp - 273.15) * 10) / 10;
          this.weather = weather;
          // save lat and lon in one object to storage
          this.storage.set('location', {lat, lon});
        });

    }).catch((error) => {
      console.log('Error getting location', error);
      // get location from storage
      this.storage.get('location').then((resp) => {
        // console.log(resp);
      // if response is not null then use coordinates from storage
      if(resp) {
        lat = resp.lat;
        lon = resp.lon;
      }else{
        lat = '25.763172';
        lon = '-80.194450';
      }
      this.weatherProvider.getWeather(lat, lon)
        .subscribe(weather => {
          // console.log(weather);
          // weather.main.temp = Math.round((weather.main.temp - 273.15) * 10) / 10;
          this.weather = weather;
          this.locationAllowed = false;

        });
      });
    });

  }
  // 
  submitSearch() {
    // console.log(this.search);
    this.weatherProvider.getWeatherByCity(this.search)
    .subscribe(weather => {
      if(weather == '0') {
        this.message = "City is not found";
        timer(3000).subscribe(() => this.message = null)
      } else {
        this.weather = weather;
        // console.log(weather);
      }
    })
  }

}
