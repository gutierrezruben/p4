import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController  } from 'ionic-angular';

/**
 * Generated class for the ModalDetallePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-modal-detalle',
  templateUrl: 'modal-detalle.html',
})
export class ModalDetallePage {
  run:any;
  gps="40.737102,-73.990318|40.749825,-73.987963|40.752946,-73.987384|40.755823,-73.986397";
  constructor(public navCtrl: NavController, public navParams: NavParams,
              public viewCtrl : ViewController ) {
                this.run=this.navParams.data;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ModalDetallePage');
  }
  cerrarModal(){
    this.viewCtrl.dismiss();
  }


}
