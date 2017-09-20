import { Component } from '@angular/core';
import { NavController, Platform, AlertController  } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
//import { LatLng } from '@ionic-native/google-maps';
import { DbProvider } from '../../providers/db/db';
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  hora:number= 0;
  minuto:number= 0;
  segundo:number= 0;
  centesima:number= 0;
  horahtml:string= '00';
  minutohtml:string= '00';
  segundohtml:string= '00';
  centesimahtml:string= '00';
  setT: any;

  isStop: boolean=false;
  isStart: boolean=true;
  isRestart: boolean=false;

  coords : any = { lat: 0, lng: 0 };
  cont:number=0;
  from: any = { lat: 0, lng: 0 };
  to: any  = { lat: 0, lng: 0 };
  dist:number=0;
  myDate: String;
  dia:any;
  tiempo:any;
  datos:any;
  tiempocarrera:number=0;

  listPosicion:string="";
  vel:number;
  run:any = {
          fecha: '' ,
          hora: '',
          distancia: 0 ,
          tiempocarrera: 0,
          velocidad: 0,
          gps: '',
          calorias: 0
        };
   distmetro:number;
  constructor(public navCtrl: NavController,  public geo: Geolocation,
              public alertCtrl: AlertController,public db: DbProvider) {

  }


  obtenerPosicion(){

        if(this.cont<4){
          this.cont=this.cont+1;
        }

        this.geo.getCurrentPosition().then((res) => {

            if(this.cont==1){
              this.listPosicion=this.listPosicion+res.coords.latitude+','+res.coords.longitude+'|';
                 this.from = {lat:res.coords.latitude,lng: res.coords.longitude};
                 this.coords.lat=res.coords.latitude;
                 this.coords.lng=res.coords.longitude;
            }

            if(this.cont==2){
              this.listPosicion=this.listPosicion+res.coords.latitude+','+res.coords.longitude;
                this.to = {lat:res.coords.latitude,lng: res.coords.longitude};
                this.dist = this.dist  + this.getDistanceBetweenPoints(this.from, this.to, 'km');
                this.coords.lat=res.coords.latitude;
                this.coords.lng=res.coords.longitude;
            }

            if(this.cont>2){
              this.listPosicion=this.listPosicion+'|'+res.coords.latitude+','+res.coords.longitude;
                this.from=this.to
                this.to =  {lat:res.coords.latitude,lng: res.coords.longitude};
                this.dist = this.dist + this.getDistanceBetweenPoints(this.from, this.to, 'km');
                this.coords.lat=res.coords.latitude;
                this.coords.lng=res.coords.longitude;
            }


       }).catch((error)=>{

           let alert = this.alertCtrl.create({
               title: 'Error:',
               message: 'gps mal',
               buttons: [
                   {
                       text: 'Aceptar',
                   }
               ]
           });

           alert.present();

         }
       );


  }



  start() {
    this.isStop=true;
    this.isStart=false;
    this.isRestart=true;
      this.setT =  setInterval(() => {

              this.tiempocarrera=this.tiempocarrera + 1;

              this.centesima= this.centesima + 1;

              if(this.centesima<10){
                this.centesimahtml= '0'+this.centesima;
              }else{
                this.centesimahtml= ''+this.centesima;
              }
              if(this.centesima == 99){
                  this.centesima=0;
                  this.segundo = this.segundo + 1;

                  if(this.segundo<10){
                    this.segundohtml= '0'+this.segundo;
                  }else{
                    this.segundohtml= ''+this.segundo;
                  }
                  // CONTROLO EL TIEMPO DE PETICION DE GPS CADA 5 SEGUNDOS
                  if(this.segundo % 5 == 0){
                    this.obtenerPosicion();

                  }
                  if (this.segundo == 60){
                    this.segundo=0;
                    this.minuto = this.minuto + 1;
                    if(this.minuto<10){
                      this.minutohtml= '0'+this.minuto;
                    }else{
                      this.minutohtml= ''+this.minuto;
                    }
                    if(this.minuto == 60){
                      this.minuto = 0;
                      this.hora = this.hora + 1;
                      if(this.hora<10){
                        this.horahtml= '0'+this.hora;
                      }else{
                        this.horahtml= ''+this.hora;
                      }
                    }
                  }
              }


        }, 10);

  }

  restart(){
    clearInterval(this.setT);
    this.hora=0;
    this.minuto=0;
    this.segundo=0;
    this.centesima=0;
    this.horahtml='00';
    this.minutohtml='00';
    this.segundohtml='00';
    this.centesimahtml='00';
    this.isStop=false;
    this.isStart=true;
    this.isRestart=false;
    this.cont=0;
    this.dist=0;

    this.fechaYhora();
    let alert = this.alertCtrl.create({
      title: 'Carrera finalizada',
      message: '¿Desea guardar la carrera?',

      buttons: [
        {
          text: 'Si',
          handler: () => {

            this.guardarBD();
          }
        },
        {
          text: 'No'
        }
      ]
    });
    alert.present();

  }

  stop(){
    clearInterval(this.setT);
    this.isStop=false;
    this.isStart=true;
    this.isRestart=true;

  }

  guardarBD(){
    this.distmetro=this.dist*1000;

    this.vel = this.distmetro/this.tiempocarrera;
    this.run = {
      fecha: this.dia,
      hora: this.tiempo,
      distancia: this.dist ,
      tiempocarrera: this.tiempocarrera/100,
      velocidad: this.vel,
      gps: this.listPosicion,
      calorias:0
    }
      this.tiempocarrera=0;
      this.listPosicion='';

     this.db.addRun(this.run).then((res)=>{

      },(err)=>{


      });
  }

  fechaYhora(){
      this.myDate= new Date().toISOString();
      this.datos=this.myDate.split("T");
      this.dia= this.datos[0];
      this.tiempo= this.datos[1].split(".",1);
  }

  getDistanceBetweenPoints(start, end, units){

       let earthRadius = {
           miles: 3958.8,
           km: 6371
       };

       let R = earthRadius[units || 'miles'];
       let lat1 = start.lat;
       let lon1 = start.lng;
       let lat2 = end.lat;
       let lon2 = end.lng;

       let dLat = this.toRad((lat2 - lat1));
       let dLon = this.toRad((lon2 - lon1));
       let a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
               Math.cos(this.toRad(lat1)) * Math.cos(this.toRad(lat2)) *
               Math.sin(dLon / 2) *
               Math.sin(dLon / 2);
       let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
       let d = R * c;
       let sol= Math.round(d*100)/100;
       return sol;

   }

   toRad(x){
       return x * Math.PI / 180;
   }


}
