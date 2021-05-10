import { Component, OnInit } from '@angular/core';
import { Heroe } from 'src/app/model/heroe.model';
import { HeroesServicesService } from 'src/app/service/heroes-services.service';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {

  heroes:Heroe[]=[];

  cargando = false;

  constructor(private service:HeroesServicesService) { }

  ngOnInit(): void {

    this.cargando=true;
    this.service.getHeroes().subscribe( data => {
      this.heroes=data;
      this.cargando=false;
    })
  }

  borrarHeroe(heroe:Heroe , i:number){

    this.heroes.splice(i,1);
      this.service.borrarHeroe(heroe.id).subscribe();
  }

}
