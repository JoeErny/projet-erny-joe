import { Injectable } from '@angular/core';
import { AppComponent } from '../app.component';
import { HttpClient } from '@angular/common/http';
import { Observable } from "rxjs";
import { environment } from '../../environments/environment'

@Injectable({
  providedIn: 'root'
})
export class ProductService{

  datas : string [];
  cpt : number = 0;

  constructor(private httpClient : HttpClient) 
  { 
    this.datas = new Array<string> ();  
  } 

  public getProduits() : Observable<any> 
  {
    return this.httpClient.get<any> (environment.baseUrl);
  }

  log (data) {
    console.log (data);
  }


  
}
