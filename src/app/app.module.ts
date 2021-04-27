import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HeaderComponent } from './header/header.component';
import { AccueilComponent } from './accueil/accueil.component';
import { AuthGuard } from './auth.guard';
import { RouterModule, Routes } from '@angular/router';
import { NgxsModule } from '@ngxs/store';
import { CatalogComponent } from './product/catalog/catalog.component';
import { ProductDetailComponent } from './product/product-detail/product-detail.component';
import { PanierState } from './shared/states/panier-state';


const appRoutes : Routes = [

  {path:'',component:AccueilComponent},

  {path: 'products', canActivate: [AuthGuard], loadChildren: () => import('./product/product.module').then(m => m.ProductModule)}
]

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    AccueilComponent,
    CatalogComponent,
    ProductDetailComponent
  ],
  imports: [
    BrowserModule,FormsModule,HttpClientModule,
    BrowserModule, FormsModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes),
    NgxsModule.forRoot([PanierState]),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
