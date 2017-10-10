import { Component } from '@angular/core';
import { NavController ,Platform,AlertController,ModalController} from 'ionic-angular';
import { DbProvider } from '../../providers/db/db';


@Component({
  selector: 'page-historial',
  templateUrl: 'historial.html'

})
export class HistorialPage {

  orden:Array<{fecha: any, runs:Array<any>}>;
  runs:any[];
  fecha:any[];
  buttonHeader:boolean[];

  constructor(public navCtrl: NavController, public db: DbProvider,
              public platform: Platform, public alertCtrl: AlertController,
              public modalCtrl: ModalController) {
                 platform.ready().then(() => {
                      this.imprimir();
                    });
  }



 imprimir(){
    this.db.getRun().then((res) =>{
       this.runs = res;
       this.fecha=[];
       this.buttonHeader=[];

       for(let i=0; i < this.runs.length ; i++){
         if (i == 0 ){
           this.fecha.push(this.runs[0].fecha);
           this.buttonHeader.push(false);


         }else {
           if(!this.incluido(this.runs[i].fecha)){
             this.fecha.push(this.runs[i].fecha);
             this.buttonHeader.push(false);

           }
         }
       }
     },(err)=>{ /* alert('error al sacar de la bd'+err) */ })




  }
toggleSection(i){
  if(this.buttonHeader[i]==false){
    this.buttonHeader[i]=true;
  }else{
    this.buttonHeader[i]=false;
  }
}
incluido(f):boolean{
  for(let i=0; i < this.fecha.length ; i++){
    if(this.fecha[i]==f){
      return true;
    }
  }
  return false;
}

sepue(i,j):boolean{

  if(i==j){
    return true;
  }
    return false;
  }
sepue2(i):any{
  return this.buttonHeader[i];
}
listado(f):any[]{
  let obj=[];
  for(let i=0; i < this.runs.length ; i++){
    if(this.runs[i].fecha==f){
      obj.push(this.runs[i])
    }
  }
  return obj;
}




  doRefresh(refresher) {

    this.db.getRun().then(res =>{
      this.runs = res;
      this.fecha=[];
      this.buttonHeader=[];
      for(let i=0; i < this.runs.length ; i++){
        if (i == 0 ){
          this.fecha.push(this.runs[0].fecha);
          this.buttonHeader.push(false);
        }else {
          if(!this.incluido(this.runs[i].fecha)){
            this.fecha.push(this.runs[i].fecha);
            this.buttonHeader.push(false);
          }
        }
      }
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
