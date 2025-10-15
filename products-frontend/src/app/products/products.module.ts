import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductCardComponent } from './product-card/product-card.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { ProductListComponent } from './product-list/product-list.component';

const routes: Routes = [
  { path: '', component: ProductListComponent },
  { path: 'produto/:id', component: ProductDetailComponent },
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    ProductListComponent,
    ProductDetailComponent,
    ProductCardComponent,
  ],
  exports: [ProductListComponent, ProductDetailComponent, ProductCardComponent],
})
export class ProductsModule {}
