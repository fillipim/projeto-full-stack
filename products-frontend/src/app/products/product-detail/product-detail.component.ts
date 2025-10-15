import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { ProductsService, Product } from '../products.service';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [CommonModule, RouterModule, MatCardModule, MatButtonModule],
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css'],
})
export class ProductDetailComponent implements OnInit {
  product?: Product;

  constructor(private route: ActivatedRoute, private productsService: ProductsService) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.loadProduct(+id);
    }
  }

  loadProduct(id: number): void {
    this.productsService.getProduct(id).subscribe(
      (product) => {
        this.product = product;
        this.updateMetaTags();
      },
      (error) => {
        console.error('Erro ao carregar produto:', error);
      }
    );
  }

  updateMetaTags(): void {
    if (this.product) {
      document
        .querySelector('meta[property="og:title"]')
        ?.setAttribute('content', this.product.nome);
      document
        .querySelector('meta[property="og:description"]')
        ?.setAttribute('content', this.product.descricao);
      document
        .querySelector('meta[property="og:image"]')
        ?.setAttribute(
          'content',
          this.product.imagem ? 'http://localhost:3000/uploads/' + this.product.imagem : ''
        );
    }
  }
}
