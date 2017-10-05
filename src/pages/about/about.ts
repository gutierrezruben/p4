import { Component,ViewChild } from '@angular/core';
import { NavController } from 'ionic-angular';
import * as HighCharts from 'highcharts';
import Chart from 'chart.js';

@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {

  @ViewChild('marksChart') marksChart;

  chartOptions: any;
  options = {
    scale: {
        // Hides the scale
        display: false
    }
  };
  data: {
    labels: ["English", "Maths", "Physics", "Chemistry", "Biology", "History"],
   datasets: [{
     label: "Student A",
     backgroundColor: "rgba(200,0,0,0.2)",
     data: [65, 75, 70, 80, 60, 80]
   }, {
     label: "Student B",
     backgroundColor: "rgba(0,0,200,0.2)",
     data: [54, 65, 60, 70, 70, 75]
   }]
  };
  ctx = document.getElementById("marksChart");

  constructor(public navCtrl: NavController) {


  }


  ionViewDidLoad(){
    this.marksChart = new Chart(this.marksChart.nativeElement, {
      type: 'radar',
         data: {
           labels: ["English", "Maths", "Physics", "Chemistry", "Biology", "History"],
           datasets: [{
             label: "Student A",
             backgroundColor: "rgba(54, 162, 235, 0.2)",
             borderColor: "rgba(54, 162, 235, 1)",
             data: [65, 75, 70, 80, 60, 80]
           }, {
             label: "Student B",
             backgroundColor: "rgba(255, 206, 86, 0.2)",
             borderColor: "rgba(255, 206, 86, 1)",
             data: [54, 65, 60, 70, 70, 75]
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
          var myChart = HighCharts.chart('container', {

            title: {
                text: 'Solar Employment Growth by Sector, 2010-2016'
            },

            subtitle: {
                text: 'Source: thesolarfoundation.com'
            },

            yAxis: {
                title: {
                    text: 'Number of Employees'
                }
            },
            legend: {
                layout: 'vertical',
                align: 'right',
                verticalAlign: 'middle'
            },

            plotOptions: {
                series: {
                    pointStart: 2010
                }
            },

            series: [{
                name: 'Installation',
                data: [43934, 52503, 57177, 69658, 97031, 119931, 137133, 154175]
            }, {
                name: 'Manufacturing',
                data: [24916, 24064, 29742, 29851, 32490, 30282, 38121, 40434]
            }, {
                name: 'Sales & Distribution',
                data: [11744, 17722, 16005, 19771, 20185, 24377, 32147, 39387]
            }, {
                name: 'Project Development',
                data: [null, null, 7988, 12169, 15112, 22452, 34400, 34227]
            }, {
                name: 'Other',
                data: [12908, 5948, 8105, 11248, 8989, 11816, 18274, 18111]
            }]

        });
  }

}
