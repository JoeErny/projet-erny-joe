import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { from, Observable } from 'rxjs';
import { filter } from 'rxjs/operators';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
  constructor(private route: ActivatedRoute, private productService : ProductService) { }
  ref : string = "";
  observableProduct$ : Observable<any> = null;
  productDetail: Array<any> = [];



  ngOnInit(): void {
    this.ref = this.route.snapshot.paramMap.get('id');
    this.observableProduct$ = this.productService.getProduits();
    this.observableProduct$.pipe(filter(p => p.ref != this.ref)).subscribe(p=>{this.productDetail.push(p)});
  }


  

}
