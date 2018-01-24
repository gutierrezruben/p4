import { Component,ViewChild } from '@angular/core';
import { NavController } from 'ionic-angular';
//import * as HighCharts from 'highcharts';
import Chart from 'chart.js';

@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {

  @ViewChild('marksChart') marksChart;


  constructor(public navCtrl: NavController) {


  }
//INTENSIDAD: RITMO<3.59 = 5 MAXIMA, RITMO=[4-4.30] media alta, RITMO= [4.31-5] MEDIA,
          //  RITMO=[5.01-5.30] MEDIA BAJA, RITMO<5.30 BAJA

  ionViewDidLoad(){
            this.marksChart = new Chart(this.marksChart.nativeElement, {
              type: 'radar',
                 data: {      //DESNIVEL
                   labels: ["Intensidad", "Calorias", "Duración", "Distancia","Ritmo"],
                   datasets: [{
                     label: "",
                     backgroundColor: "rgba(255, 203, 0, 0.5)",
                     borderColor: "rgba(255, 203, 0, 1)",
                     data: [80, 80, 80, 80,80]
                   /*}, {
                     label: "Media",
                     backgroundColor: "rgba(255, 206, 86, 0.2)",
                     borderColor: "rgba(255, 206, 86, 1)",
                     data: [54, 65, 60, 70, 70, 75]*/
                   }]
                 },
                    options: {
                      padding: {
                        left: 50,
                        right: 0,
                        top: 0,
                        bottom: 0

                      },
                      legend: {
                          labels: {
                            // This more specific font property overrides the global property
                            fontColor: 'blue',
                            fontSize: 20
                        }
                      },
                      title: {
                            display: true,
                            text: 'Grafica de Ruben',
                            fontSize: 20
                        },
                        tooltips: {
                              callbacks: {
                                  labelColor: function(tooltipItem, chart) {
                                      return {
                                          borderColor: 'rgb(255, 0, 0)',
                                          backgroundColor: 'rgb(255, 0, 0)'
                                      }
                                  },
                                  labelTextColor:function(tooltipItem, chart){
                                      return '#543453';
                                  }
                              }
                          }
                    }

             });



  }

}
