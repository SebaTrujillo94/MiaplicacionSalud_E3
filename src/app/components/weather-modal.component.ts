import { Component, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-weather-modal',
  standalone: true,
  imports: [CommonModule, IonicModule],
  template: `
    <ion-header>
      <ion-toolbar color="primary">
        <ion-title>Información del Clima</ion-title>
        <ion-buttons slot="end">
          <ion-button (click)="closeModal()">
            <ion-icon name="close"></ion-icon>
          </ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>

    <ion-content class="ion-padding">
      <ion-card class="weather-card animated-card" *ngIf="clima">
        <ion-card-content class="weather-content">
          <div class="weather-header">
            <div class="weather-location">
              <ion-icon name="location-outline" color="primary"></ion-icon>
              <span class="location-text">{{ clima.data[0].city_name }}, {{ clima.data[0].country_code }}</span>
            </div>
            <div class="weather-time">
              <ion-icon name="time-outline" color="medium"></ion-icon>
              <span class="time-text">{{ getCurrentTime() }}</span>
            </div>
          </div>
          
          <div class="weather-main">
            <div class="temperature-section">
              <div class="temperature">{{ clima.data[0].temp }}°</div>
              <div class="feels-like">Sensación {{ clima.data[0].app_temp }}°</div>
            </div>
            
            <div class="weather-icon-section">
              <div class="weather-icon">
                <ion-icon [name]="getWeatherIcon(clima.data[0].weather.code)" size="large" [color]="getWeatherColor(clima.data[0].weather.code)"></ion-icon>
              </div>
              <div class="weather-description">{{ clima.data[0].weather.description }}</div>
            </div>
          </div>
          
          <div class="weather-details">
            <div class="detail-item">
              <ion-icon name="eye-outline" color="primary"></ion-icon>
              <span class="detail-label">Visibilidad</span>
              <span class="detail-value">{{ clima.data[0].vis }} km</span>
            </div>
            
            <div class="detail-item">
              <ion-icon name="water-outline" color="primary"></ion-icon>
              <span class="detail-label">Humedad</span>
              <span class="detail-value">{{ clima.data[0].rh }}%</span>
            </div>
            
            <div class="detail-item">
              <ion-icon name="leaf-outline" color="primary"></ion-icon>
              <span class="detail-label">Viento</span>
              <span class="detail-value">{{ clima.data[0].wind_spd.toFixed(1) }} km/h</span>
            </div>
            
            <div class="detail-item">
              <ion-icon name="speedometer-outline" color="primary"></ion-icon>
              <span class="detail-label">Presión</span>
              <span class="detail-value">{{ clima.data[0].pres.toFixed(0) }} hPa</span>
            </div>
          </div>
          
          <div class="weather-footer">
            <ion-button size="small" fill="clear" color="medium" (click)="refreshWeather()">
              <ion-icon name="refresh-outline" slot="start"></ion-icon>
              Actualizar
            </ion-button>
            <div class="last-update">
              <ion-icon name="cloud-download-outline" color="medium"></ion-icon>
              <span>Actualizado hace {{ getTimeSinceUpdate() }}</span>
            </div>
          </div>
        </ion-card-content>
      </ion-card>
    </ion-content>
  `,
  styleUrls: ['../home/home.page.scss']
})
export class WeatherModalComponent {
  @Input() clima: any;
  @Input() getWeatherIcon!: (code: number) => string;
  @Input() getWeatherColor!: (code: number) => string;
  @Input() getCurrentTime!: () => string;
  @Input() getTimeSinceUpdate!: () => string;
  @Input() refreshWeather!: () => void;

  constructor(private modalController: ModalController) {}

  async closeModal() {
    await this.modalController.dismiss();
  }
}
