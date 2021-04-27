import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CatalogComponent } from './catalog/catalog.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { RouterModule, Routes } from '@angular/router';
import { BasketComponent } from './basket/basket.component';

const appRoutes : Routes = [
  {path:'catalog',component:CatalogComponent},
  {path: 'detail/:id', component: ProductDetailComponent },
  {path: 'basket', component: BasketComponent }
]
 

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild (appRoutes)
  ]
})
export class ProductModule { }
