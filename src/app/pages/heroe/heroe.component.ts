import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Heroe } from 'src/app/model/heroe.model';
import { HeroesServicesService } from 'src/app/service/heroes-services.service';

@Component({
  selector: 'app-heroe',
  templateUrl: './heroe.component.html',
  styleUrls: ['./heroe.component.css']
})
export class HeroeComponent implements OnInit {

  heroe:Heroe = new Heroe();

  constructor(private service:HeroesServicesService , private router:ActivatedRoute) { }

  ngOnInit(): void {
    const id = this.router.snapshot.paramMap.get('id');

    if( id!== 'nuevo'){
        this.service.getHeroe(id).subscribe((data: Heroe)=>{
         this.heroe = data;
         this.heroe.id=id;
        })

        
    }

  }


  guardar(form: NgForm){

    if(this.heroe.id){
      this.service.actualizarHeroe( this.heroe ).subscribe(data=>{
        console.log(data);
      });
    }else{
      this.service.crearHeroe( this.heroe ).subscribe(data=>{
        console.log(data);
      });
    }

    
   

  }

}
