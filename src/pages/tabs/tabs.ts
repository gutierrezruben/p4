import { Component } from '@angular/core';

import { AboutPage } from '../about/about';
import { HistorialPage } from '../historial/historial';
import { EntrenamientoPage } from '../entrenamiento/entrenamiento';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = EntrenamientoPage;
  tab2Root = AboutPage;
  tab3Root = HistorialPage;

  constructor() {

  }
}
