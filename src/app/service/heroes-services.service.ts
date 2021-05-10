import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Heroe } from '../model/heroe.model';

import {  map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class HeroesServicesService {

 private url = 'https://login-ap-83a95-default-rtdb.firebaseio.com'

  constructor(private http:HttpClient) { }

  crearHeroe(heroe:Heroe){
      return this.http.post(`${this.url}/heores.json` , heroe).pipe(
        map((resp:any) => {
          heroe.id=resp.name
          return heroe;
        })
      );
  }


actualizarHeroe(heroe:Heroe){

  const heroeTemp={
    ...heroe
  }

  delete heroeTemp.id;
return this.http.put(`${this.url}/heores/${heroe.id}.json`,heroeTemp);
}


getHeroes(){
  return this.http.get(`${this.url}/heores.json`).pipe(
    map( 
        this.crearArreglo
    )
  )
}


private crearArreglo(heroesObj:object){
 
const heroes: Heroe[] = [];

Object.keys( heroesObj ).forEach(key =>{
const heroe: Heroe = heroesObj[key];
heroe.id=key;

heroes.push( heroe );
});

if(heroesObj===null){
return [];
}

return heroes;
}

getHeroe(id:string){
return this.http.get(`${this.url}/heores/${id}.json`);
}


borrarHeroe(id:string){
return this.http.delete(`${this.url}/heores/${id}.json`);
}


}
