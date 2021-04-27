import { APP_ID, Component, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { AddReference } from 'src/app/shared/actions/panier.action';
import { ProductService } from '../product.service';
import { HttpClient, HttpHeaders, HttpClientModule } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { catchError, tap } from 'rxjs/operators';

const optionRequete = {
  headers: new HttpHeaders({ 
    'Access-Control-Allow-Origin':'*',
    'mon-entete-personnalise':'maValeur'
  })
};

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.css']
})
export class CatalogComponent implements OnInit {

 

  title = 'TP03-ERNY-Joe';
  tabData : Array<String> = [];
  subscribe : any;


  constructor(private productService : ProductService, private store : Store, private http : HttpClient)  { }
  observableProductsFromMock$ : Observable<any> = null;
  observableProductsNotFromMock$:Observable<any> = null;
  observableProductsFromDb$:Observable<any> = null;


  tabCheapProducts : Array<any> = [];
  limitPrice : any = 0;


  ngOnInit(): void {
    this.observableProductsFromDb$ = this.http.get<any>(environment.apiBddUrl);
  }

  addPanier (ref : string) {    
    this.store.dispatch (new AddReference ({"reference":ref}));
  }

}


