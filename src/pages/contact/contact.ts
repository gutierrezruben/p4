import { Component } from '@angular/core';
import { NavController ,Platform,NavParams,AlertController,ModalController} from 'ionic-angular';
import { DbProvider } from '../../providers/db/db';

@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html'
})
export class ContactPage {

  orden:Array<{fecha: any, runs:Array<any>}>;
  /*r:Array<{fecha: string,
             hora: string,
             distancia: string,
             velocidad: string,
             gps: string,
             calorias: string}>;*/
  runs:any[];
  fecha:any[];
  aux:any[];
  ru:any[];
  constructor(public navCtrl: NavController, public db: DbProvider,
              public platform: Platform, public alertCtrl: AlertController,
              public modalCtrl: ModalController) {
                 platform.ready().then(() => {
                      this.imprimir();
                    });
  }

  ionViewDidEnter() {
     this.imprimir();
 }

 imprimir(){
    this.db.getRun().then((res) =>{
       this.runs = res;
       this.aux = this.runs;
     },(err)=>{ /* alert('error al sacar de la bd'+err) */ })

     for(let i=0; i < this.runs.length ; i++){
       let guardado : boolean=false;
        if (i == 0 ){
          this.orden.push(this.runs[0].fecha,this.runs[0]);
        }else {
          for(let j=0;j<this.orden.length || guardado==true ;j++){
            if(this.orden[j].fecha==this.runs[i].fecha){
              this.orden[j].runs.push(this.runs[i]);
              guardado=true;
            }
          }
          if(guardado==false){
              this.orden.push(this.runs[i].fecha,this.runs[i]);
          }
        }
     }

  }

  doRefresh(refresher) {

    this.db.getRun().then(res =>{
      this.runs = res;

      if(this.runs.length == res.length){
        refresher.complete();
      }

    })



  }

  mostrarInfo(carrera){
    let modalInfo = this.modalCtrl.create('ModalDetallePage',carrera);
    modalInfo.present();
  }

}
