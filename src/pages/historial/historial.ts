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
  fechaUltimoDiaEntrenado:any;
  fechaPrimerDiaEntrenado:any;
  diasEntrenados:any[];
  mesesEntrenados:any[];
  anyosEntrenados:any[];
  fechaActual:any;
  activ:boolean=false;
  fechaseleccionada:any;
  fin=false;
  constructor(public navCtrl: NavController, public db: DbProvider,
              public platform: Platform, public alertCtrl: AlertController,
              public modalCtrl: ModalController) {
                 platform.ready().then(() => {
                   this.ionViewDidLoad();

                    });
  }
  activo(){
    this.activ=true;
  }
  ionViewDidLoad() {
    while(this.fin==false){
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


      })
          this.obtenerTodosLosAnyosMesesDias();
    }

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

       this.fechaActualYobtenerTodasLasFechas();
     },(err)=>{ /* alert('error al sacar de la bd'+err) */ })
       this.obtenerTodosLosAnyosMesesDias();

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

  listado():any[]{
    let f= this.fechaseleccionada;
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
        this.obtenerTodosLosAnyosMesesDias();
      if(this.runs.length == res.length){
        refresher.complete();
      }

    })



  }

  mostrarInfo(carrera){
    let modalInfo = this.modalCtrl.create('ModalDetallePage',carrera);
    modalInfo.present();
  }

  fechaActualYobtenerTodasLasFechas(){
    let myDate= new Date().toISOString();
    let datos= myDate.split("T");
    this.fechaActual=  datos[0];


    //OBTENEMOS TODOS LOS DATOS PARA MOSTRARLO EN LA fecha

    this.obtenerTodosLosAnyosMesesDias();


  }

  obtenerTodosLosAnyosMesesDias(){
    this.anyosEntrenados= [];
    this.mesesEntrenados= [];
    this.diasEntrenados= [];
    for(let i=0; i < this.runs.length ; i++){
      var datos= this.runs[i].fecha.split("-");
      if(i==0){
          this.anyosEntrenados.push(datos[0]);
          this.mesesEntrenados.push(datos[1]);
          this.diasEntrenados.push(datos[2]);
      }else{
        if(!this.incluidoAnyo(datos[0])){
          this.anyosEntrenados.push(datos[0]);
        }

        if(!this.incluidoMes(datos[1])){
          this.mesesEntrenados.push(datos[1]);
        }

        if(!this.incluidoDia(datos[2])){
          this.diasEntrenados.push(datos[2]);
        }
      }


    }
    this.fin=true;
  }

  incluidoAnyo(f):boolean{
    for(let i=0; i < this.anyosEntrenados.length ; i++){
      if(this.anyosEntrenados[i]==f){
        return true;
      }
    }
    return false;
  }
  incluidoMes(f):boolean{
    for(let i=0; i < this.mesesEntrenados.length ; i++){
      if(this.mesesEntrenados[i]==f){
        return true;
      }
    }
    return false;
  }
  incluidoDia(f):boolean{
    for(let i=0; i < this.diasEntrenados.length ; i++){
      if(this.diasEntrenados[i]==f){
        return true;
      }
    }
    return false;
  }

  buscarEntrenoPorFecha(){

  }
}
