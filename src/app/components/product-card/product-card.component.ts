import { Component, Input, OnInit } from '@angular/core';
import { Product } from 'src/app/models';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss']
})
export class ProductCardComponent {

  @Input()
  product: Product;

  constructor() {
    this.product = new Product();
  }
}
