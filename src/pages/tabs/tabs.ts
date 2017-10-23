import { Component } from '@angular/core';

import { AboutPage } from '../about/about';
import { HistorialPage } from '../historial/historial';
import { EntrenamientoPage } from '../entrenamiento/entrenamiento';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab3Root = EntrenamientoPage;
  tab2Root = AboutPage;
  tab1Root = HistorialPage;

  constructor() {

  }
}
