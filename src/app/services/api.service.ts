import { Injectable } from '@angular/core';
import{HttpClient} from '@angular/common/http'
@Injectable({
  providedIn: 'root'
})
export class ApiService {
///inicializar import http
constructor(public http:HttpClient) { }

///paises afectados
getcountries(){
  return this.http.get('https://api.covid19api.com/countries');
}

//resumen covid global country
////Summary////global/////countries
getsummary(){
  return this.http.get('https://api.covid19api.com/summary');
} 



//Historical country 
gethistoricalcountry(country){
  return this.http.get('https://api.covid19api.com/total/dayone/country/'+country);
} 

}
