import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { WeatherProvider } from '../../providers/weather/weather';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  weather: any;
  location: {
    lat: string,
    lon: string
  }


  constructor(public navCtrl: NavController, private weatherProvider: WeatherProvider) {

  }

  ionViewWillEnter() {
    this.location = {
      lat: '60.294303',
      lon: '25.035858'
    }

    this.weather = this.weatherProvider.getWeather(this.location.lat, this.location.lon)
      .subscribe(weather => {
        console.log(weather);
        this.weather = weather;


      });
  }

}
