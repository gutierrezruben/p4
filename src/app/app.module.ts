import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { AboutPage } from '../pages/about/about';
import { HistorialPage } from '../pages/historial/historial';
import { EntrenamientoPage } from '../pages/entrenamiento/entrenamiento';
import { TabsPage } from '../pages/tabs/tabs';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { DbProvider } from '../providers/db/db';

import { SQLite } from '@ionic-native/sqlite';
import { Geolocation } from '@ionic-native/geolocation';

import { ChartModule } from 'angular2-highcharts';
import * as highcharts from 'Highcharts';

@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    HistorialPage,
    EntrenamientoPage,
    TabsPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    ChartModule.forRoot(highcharts)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    HistorialPage,
    EntrenamientoPage,
    TabsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    DbProvider,
    SQLite,
    Geolocation
  ]
})
export class AppModule {}
