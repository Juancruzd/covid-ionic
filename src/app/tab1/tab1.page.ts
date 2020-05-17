import { Component, OnInit, ViewChild, ElementRef  } from '@angular/core';   
import { ApiService } from '../services/api.service' 
import{HttpClient} from '@angular/common/http'; 
import { Country } from '../shared/Country'; 
import {FormBuilder,FormGroup,Validators ,FormControl} from '@angular/forms'; 
@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})

export class Tab1Page implements OnInit {    
  ////variables de datos
  NewConfirmed;
  TotalConfirmed;
  NewDeaths;
  TotalDeaths;
  NewRecovered;
  TotalRecovered;
  Date;
  ////formukario de select
  select: FormGroup; 
  ////arreglo de objetos de los paises afectados a mostrar en el select
  countries=[];
  constructor(public api:ApiService,public http:HttpClient ,public fb: FormBuilder ) { 
    ////validacion de formulario
    this.select = this.fb.group({ 
      country: ['']
    });

  }   
  ///cuando se carga la pagina muestro por default los datos de manera global 
  ///y obtengo los paises a mostrar en el select
  async ngOnInit() { 
    ///paises
    this.fetchCountries(); 
    ///informacion global
    this.fetchGlobal();  
  } 

  
  ////funcion que obtiene los paises  a mostrar en el select
  async fetchCountries(){
    this.api.getcountries().subscribe(
      (data)=>{  
        ///creo un objeto a agregar a la lista para Todos los paises o global
        let country: Country={    
          Country:"Todos los paises",
          Slug:"global",
          ISO2:"global"
        }; 
        ///La respuesta se hace tipo Country y se guarda en countries
        this.countries=data as Country[]; 
        ///se agrega el objeto en la primera posicion
        this.countries.unshift(country); 

    }, (error)=>{ console.log(error) });
  };



  ///funcion q se activa 1s despues de hacer click en el select para mostrar las banderas de cada pais
  ///atravez del ISO2 que es codigo de cada pais por ejemplo mexico MX
  ////recibe como parametros los paises afectados cargados en el select
  loadFlags(countries) {
    ////settimeout despues de 1s
  setTimeout(function(){  
        ///obtengo todos los objetos que se esten mostrando por el select 'alert-radio-label'
        let radios=document.getElementsByClassName('alert-radio-label');  
        ////ciclo 
        for (let index = 0; index < radios.length; index++) { 
          ////acedo al objrto
            let element = radios[index]; 
            ///si el objeto es global es decir es el q yo agregue
            if(countries[index].ISO2=="global"){ 
              ////se agrega una bandera de  mundo con titulo Todos los paises
              element.innerHTML='<img style="margin-right: 10px;" src="https://www.gstatic.com/images/icons/material/system_gm/1x/language_googblue_24dp.png"/>  Todos los paises';
            }else{
              ////se agrega una bandera obtenida de la api   www.countryflags.io 
              ////atravez del ISO2 que es el codigo de cada pais en minuscula, ademas se arega el titulo que es el nombre del pais
            element.innerHTML='<img style="margin-right: 10px;" src="https://www.countryflags.io/'+countries[index].ISO2.toLowerCase()+'/flat/24.png" />  '+countries[index].Country;
            }
        } 

  }, 500);
  }  



  ///funcion global
  ///se accede a summary y se obtiene la informacion de la 
  ///etiqueta Global
  async fetchGlobal(){
    this.api.getsummary().subscribe(
      (data)=>{   
        this.Date= data['Date'];  
        this.NewConfirmed=data['Global'].NewConfirmed;
        this.TotalConfirmed=data['Global'].TotalConfirmed;
        this.NewDeaths=data['Global'].NewDeaths;
        this.TotalDeaths=data['Global'].TotalDeaths;
        this.NewRecovered=data['Global'].NewRecovered;
        this.TotalRecovered=data['Global'].TotalRecovered;
    },
     (error)=>{ console.log(error) });
  } 



  ////Funcion de Busqueda
  ///se accede a la informacion atravez de summary
  ///por medio de la etiqueta Countries
  ///recibe como parametro el value del ion select opcion seleccionado
  onChange(value){  
    ////si lo que se selecciona es todos los paises se llama a ala funcion global
    if(value=="global"){
      this.fetchGlobal();
    }
    else
    {
      ////se accede a paises
      this.api.getsummary().subscribe(
        (data)=>{
          let country: any[] = [];  
          country= data['Countries'] as Country[]; 
          ///se cicla la respuesta
          ///se filta para encontrar la coincidencia con 
          ///el value seleccionado atravez del SLUG
          country.forEach(item => {   
            if(item.Slug==value){
          this.Date= item.Date;  
          this.NewConfirmed=item.NewConfirmed;
          this.TotalConfirmed=item.TotalConfirmed;
          this.NewDeaths=item.NewDeaths;
          this.TotalDeaths=item.TotalDeaths;
          this.NewRecovered=item.NewRecovered;
          this.TotalRecovered=item.TotalRecovered;
            }
          });
          
      },
       (error)=>{ console.log(error) });
    } 
  }
}
