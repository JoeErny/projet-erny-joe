import { Component, OnInit } from '@angular/core';
import { ProductService } from './product/product.service';
import {Observable,of,from} from 'rxjs';
import {filter} from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent  implements OnInit{
  title = 'TP03-ERNY-Joe';
  tabData : Array<String> = [];
  subscribe : any;

  constructor(private productService : ProductService)  { }
  observableProductsFromMock$ : Observable<any> = null;
  observableProductsNotFromMock$:Observable<any> = null;

  tabCheapProducts : Array<any> = [];
  limitPrice : any = 0;


  ngOnInit(): void 
  {
    this.observableProductsNotFromMock$ = from ([
      {"titre":"bugatti","prix":2000000},
      {"titre":"twingo","prix":15000},
      {"titre":"velo","prix":700},
      {"titre":"trottinette","prix":50},
      {"titre":"rollers","prix":20}]
    ); 
  }

  onClickGetMock () 
  {
    this.observableProductsFromMock$ = this.productService.getProduits();
  }

  onClickFilterProducts()
  {
    this.tabCheapProducts = [];
    this.observableProductsNotFromMock$.pipe(filter(p => p.prix < this.limitPrice)).subscribe(p=>{this.tabCheapProducts.push(p)});
  }
}


