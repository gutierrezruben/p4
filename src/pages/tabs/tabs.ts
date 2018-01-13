import { Component } from '@angular/core';

import { AboutPage } from '../about/about';
import { HistorialPage } from '../historial/historial';
import { EntrenamientoPage } from '../entrenamiento/entrenamiento';
import { AjustesPage } from '../ajustes/ajustes';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = EntrenamientoPage;
  tab2Root = AboutPage;
  tab3Root = HistorialPage;
  tab4Root = AjustesPage;

  constructor() {

  }
}
