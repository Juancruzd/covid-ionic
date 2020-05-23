import { Component, OnInit, ViewChild, ElementRef  } from '@angular/core';   
import { ApiService } from '../services/api.service' 
import{HttpClient} from '@angular/common/http'; 
import { Country } from '../shared/Country'; 
import { Historical } from '../shared/historical'; 
import {FormBuilder,FormGroup,Validators ,FormControl} from '@angular/forms'; 
import { ChartDataSets } from 'chart.js';
import { Color, Label } from 'ng2-charts';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})

export class Tab1Page implements OnInit {   
   // Data de grafica 4 series
   chartData: ChartDataSets[] = [
     { data: [], label: 'Confirmados' },
     { data: [], label: 'Muertes' },
     { data: [], label: 'Recuperados' },
     { data: [], label: 'Activos' }];
  ///arreglo de labels
   chartLabels: Label[];
   // Options de la grafica
  chartOptions = {
    responsive: true,
    ////titulo no mostrado
    title: {
      display: false,
      text: ''
    },
    pan: {
      enabled: true,
      mode: 'xy'
    },
    zoom: {
      ///poder hacer zoom sobre la grafica
      enabled: true,
      mode: 'xy'
    }
  };
  ///color de la grafica
  chartColors: Color[] = [
    {
      //color rojo confirmed
      borderColor: '#FA5858',
      backgroundColor: 'rgba(255,255,255,0)',
      pointBackgroundColor: '#FA5858'
    },
    {
      ///color negro muertes
      borderColor: '#000000',
      backgroundColor: 'rgba(255,255,255,0)',
      pointBackgroundColor: '#000000'
    } ,
    {
      //color verde recuperados
      borderColor: '#32CA40',
      backgroundColor: 'rgba(255,255,255,0)',
      pointBackgroundColor: '#32CA40'
    } ,
    {
      //color azul activos
      borderColor: '#4498D6',
      backgroundColor: 'rgba(255,255,255,0)',
      pointBackgroundColor: '#4498D6'
    }
  ];
  ///tipo de grafica line
  chartType = 'line';
  ///legenda visible
  showLegend = true; 
  ///variable para ocultar o mostrar grafica
  hsgrafica=true; 
  //pais seleccionado en select mostrandose como titulo
  countryselected

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
  constructor(public api:ApiService,public http:HttpClient ,public fb: FormBuilder,private datePipe: DatePipe) { 
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
        ///ordeno el arreglo de respuesta por country
        this.countries.sort((t1, t2) => {
          const name1 = t1.Country.toLowerCase();
          const name2 = t2.Country.toLowerCase();
          if (name1 > name2) { return 1; }
          if (name1 < name2) { return -1; }
          return 0;
        }); 
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
        this.Date= this.datePipe.transform(data['Date'].substring(0, 10), 'dd-MM-yyyy');  
        this.NewConfirmed=data['Global'].NewConfirmed;
        this.TotalConfirmed=data['Global'].TotalConfirmed;
        this.NewDeaths=data['Global'].NewDeaths;
        this.TotalDeaths=data['Global'].TotalDeaths;
        this.NewRecovered=data['Global'].NewRecovered;
        this.TotalRecovered=data['Global'].TotalRecovered;
    },
     (error)=>{ console.log(error) });
  } 



  ////Funcion de Busqueda y grafica
  ///se accede a la informacion atravez de summary
  ///por medio de la etiqueta Countries
  ///recibe como parametro el value del ion select opcion seleccionado
  ///se muestra la grafica solo a nivel pais
  onChange(value){  
    ////si lo que se selecciona es todos los paises se llama a ala funcion global
    if(value=="global"){
      ///se vacea los valores de la grafica
      this.chartLabels = [];
      this.chartData[0].data = [];
      this.chartData[1].data = []; 
      this.chartData[2].data = []; 
      this.chartData[3].data = []; 
      ///se oculta la grafica
      this.hsgrafica=true;
      ///se cosulta a nivel global
      this.fetchGlobal();
    }
    else
    {
      ////se accede a paises
      this.api.getsummary().subscribe((data)=>{
          let country: any[] = [];  
          ///paises
          country= data['Countries'] as Country[]; 
          ///se cicla la respuesta
          ///se filta para encontrar la coincidencia con 
          ///el value seleccionado atravez del SLUG
          country.forEach(item => {   
            /// se filtra la seleccion
            if(item.Slug==value){
              ///se formatea la fecha  dd-MM-yyyy con DatePipe
          this.Date= this.datePipe.transform(item.Date.substring(0, 10), 'dd-MM-yyyy');  
          ///nuevos confimados
          this.NewConfirmed=item.NewConfirmed;
          ///total de confirmados
          this.TotalConfirmed=item.TotalConfirmed;
          ///nuevas muertes
          this.NewDeaths=item.NewDeaths;
          ///total de muertes
          this.TotalDeaths=item.TotalDeaths;
          ///nuevos recuperados
          this.NewRecovered=item.NewRecovered;
          ///total de recuperados
          this.TotalRecovered=item.TotalRecovered;
            }
          });
          
      }, (error)=>{ console.log(error) }); 
       
      
      //////obtiene los datos historicos por pais
      ///parametro value SLUG select
      this.api.gethistoricalcountry(value).subscribe(res => {
        ///se muestra la grafica
        this.hsgrafica=false;
        ////se hace la respuesta tipo objeto HISTORICAL
        const history = res as Historical[]; 
        ///Se vacea los valores de la grafica
        this.chartLabels = [];
        this.chartData[0].data = [];
        this.chartData[1].data = []; 
        this.chartData[2].data = []; 
        this.chartData[3].data = []; 
        /// se agrega titulo a la divicion de la grafica tomando el nombre del pais seleccionado
        this.countryselected='Historial de '+history[0].Country
        ///se cicla la respuesta 
        for (let entry of history) {
          //se agrega el objeto label formateando la fecha  dd-MM-yyyy con DatePipe
          this.chartLabels.push(this.datePipe.transform(entry.Date.substring(0, 10), 'dd-MM-yyyy'));
          ///se toma el dato de confimado y se agrega a datos de la grafica
          this.chartData[0].data.push(entry.Confirmed);
          ///se toma el dato de muertes y se agrega a datos de la grafica
          this.chartData[1].data.push(entry.Deaths);
           ///se toma el dato de Recuperados y se agrega a datos de la grafica
           this.chartData[2].data.push(entry.Recovered);
           ///se toma el dato de Activos y se agrega a datos de la grafica
           this.chartData[3].data.push(entry.Active);
          
        }
      });
    } 
  } 
}
