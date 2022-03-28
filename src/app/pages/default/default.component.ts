import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models';
import { ProductService } from 'src/app/services';

@Component({
  selector: 'app-default',
  templateUrl: './default.component.html',
  styleUrls: ['./default.component.scss']
})
export class DefaultComponent implements OnInit {

  products: Product[];

  constructor(private productService: ProductService) {
    this.products = new Array<Product>();
  }

  ngOnInit(): void {
    this.productService.getProducts('New').subscribe(observer => {
      this.products = observer;
    });
  }
}