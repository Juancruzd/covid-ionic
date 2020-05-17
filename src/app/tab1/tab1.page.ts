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
  NewConfirmed;
  TotalConfirmed;
  NewDeaths;
  TotalDeaths;
  NewRecovered;
  TotalRecovered;
  Date;
  select: FormGroup; 
  countries=[];
  constructor(public api:ApiService,public http:HttpClient ,public fb: FormBuilder ) { 
    this.select = this.fb.group({ 
      country: ['']
    });

  }   
  async ngOnInit() { 
    this.fetchCountries(); 
    this.fetchGlobal();  
  } 
  async fetchCountries(){
    this.api.getcountries().subscribe(
      (data)=>{  
        let country: Country={    
          Country:"Todos los paises",
          Slug:"global",
          ISO2:"global"
        }; 
          
        this.countries=data as Country[]; 
        this.countries.unshift(country); 
    }, (error)=>{ console.log(error) });
  };
  loadFlags(countries) {
  setTimeout(function(){  
        let radios=document.getElementsByClassName('alert-radio-label');  
        for (let index = 0; index < radios.length; index++) { 
            let element = radios[index]; 
            if(countries[index].ISO2=="global"){ 
              element.innerHTML='<img style="margin-right: 10px;" src="https://www.gstatic.com/images/icons/material/system_gm/1x/language_googblue_24dp.png"/>  Todos los paises';
            }else{   
            element.innerHTML='<img style="margin-right: 10px;" src="https://www.countryflags.io/'+countries[index].ISO2.toLowerCase()+'/flat/24.png" />  '+countries[index].Country;
            }
        } 

  }, 1000);
  }  
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
  onChange(value){ 
    //this.select.reset();
    if(value=="global"){
      this.fetchGlobal();
    }else{
      this.api.getsummary().subscribe(
        (data)=>{
          let country: any[] = [];  
          country= data['Countries'] as Country[]; 

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
