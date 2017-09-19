import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ModalDetallePage } from './modal-detalle';

@NgModule({
  declarations: [
    ModalDetallePage,
  ],
  imports: [
    IonicPageModule.forChild(ModalDetallePage),
  ],
})
export class ModalDetallePageModule {}
