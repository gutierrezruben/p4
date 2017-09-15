import { Component } from '@angular/core';
import { NavController ,Platform,NavParams,AlertController} from 'ionic-angular';
import { DbProvider } from '../../providers/db/db';

@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html'
})
export class ContactPage {

  //runs:Array<{fecha: string, hora: string, distancia: string,velocidad: string, gps: string, calorias: string}>;
  runs:any[] = [];
  constructor(public navCtrl: NavController, public db: DbProvider,
              public platform: Platform, public alertCtrl: AlertController) {
                 platform.ready().then(() => {
                      this.imprimir();
                    });




  }

  ionViewDidLoad() {
     this.imprimir();
 }

 imprimir(){
    this.db.getRun().then(res =>{ this.runs = res; })


  }
  doRefresh(refresher) {

    this.db.getRun().then(res =>{
      this.runs = res;
      if(this.runs.length > 1){
        refresher.complete();
        let alert = this.alertCtrl.create({
          title: 'Carrera finalizada',
          message: this.runs+'',

          buttons: [
            {
              text: 'Si',

            },
            {
              text: 'No'
            }
          ]
        });
        alert.present();
      }

    })


  }
}
