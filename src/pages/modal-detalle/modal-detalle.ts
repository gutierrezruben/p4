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
  gps="36.721447,-4.379883|36.721469,-4.382445|36.721486,-4.385968|36.722313,-4.388288|36.722537,-4.390630|36.722519,-4.391661|36.722520,-4.391566|36.723113,-4.394398|36.722906,-4.395429|36.722270,-4.397220|36.721780,-4.399291|36.721100,-4.401319|36.720567,-4.403110|36.720481,-4.403969|36.720335,-4.405181|36.719810,-4.406275|36.719320,-4.407391|36.718366,-4.408861|36.718271,-4.409440"
//"36.721447,-4.379883|36.721469,-4.382445|36.721486,-4.385968|36.722313,-4.388288|36.722537,-4.390630|36.722519,-4.391661|36.722537,-4.391532|36.723113,-4.394398|36.722906,-4.395429|36.722270,-4.397220|36.721780,-4.399291|36.721100,-4.401319|36.720567,-4.403110|36.720481,-4.403969|36.720335,-4.405181|36.719810,-4.406275|36.719320,-4.407391|36.718366,-4.408861|36.718271,-4.409440"
  inicio="36.721447,-4.379883";
  fin="36.718271,-4.409440";
  distancie= 2.79;
  ritmo= 4.30;
  duracion = 11.997;
  calorias=250;




  //ritmo=tiempo/distancia;
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
