import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';


@Injectable()
export class DbProvider {

  db: SQLiteObject=null;

  constructor(public sqlite: SQLite) {
    console.log('Hello DbProvider Provider');
  }

  public openDb(){
      return this.sqlite.create({
          name: 'data.db',
          location: 'default' // el campo location es obligatorio
      })
      .then((db: SQLiteObject) => {
       this.db =db;
     })
  }

  public createTableUsu(){
      return this.db.executeSql("create table if not exists usu( id INTEGER PRIMARY KEY AUTOINCREMENT,login NUMBER, correo TEXT,pass TEXT,nombre TEXT,sexo TEXT,altura FLOAT,peso FLOAT,foto TEXT )",{})
    }
  public addUsu(usu){
    let sql = "INSERT INTO usu (login,correo,pass,nombre,sexo,altura,peso,foto) VALUES (?,?,?,?,?,?,?,?)";
    return this.db.executeSql(sql,[usu.login,usu.correo,usu.pass,usu.nombre,usu.sexo,usu.altura,usu.peso,usu.foto]);
  }
  public getUser(){
    let sql = "SELECT * FROM usu";
    return this.db.executeSql(sql,{});
  }

  public createTableRun(){
      return this.db.executeSql("create table if not exists run( id INTEGER PRIMARY KEY AUTOINCREMENT, fecha TEXT, hora TEXT, distancia TEXT, tiempocarrera NUMBER, velocidad FLOAT, gps TEXT, calorias FLOAT )",{})
    }
  public addRun(ru){
    let sql = "INSERT INTO run (fecha , hora , distancia , tiempocarrera, velocidad , gps , calorias ) VALUES (?,?,?,?,?,?,?)";
    return this.db.executeSql(sql,[ru.fecha , ru.hora , ru.tiempocarrera,ru.distancia , ru.velocidad ,ru.gps , ru.calorias ]);
  }
  public getRun(){
    let sql = "SELECT * FROM run";
    return this.db.executeSql(sql,{})
                  .then(response =>{
                      let tasks = [];
                      for(let i=0 ; i < response.rows.length; i++){
                        tasks.push (response.rows.item(i));
                      }
                      return Promise.resolve(tasks);
                  });

  }

}
