import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Product } from 'src/app/models';
import { ProductService } from 'src/app/services';

@Component({
  selector: 'app-last-visited-products',
  templateUrl: './last-visited-products.component.html',
  styleUrls: ['./last-visited-products.component.scss']
})
export class LastVisitedProductsComponent implements OnInit {

  products: Product[];
  private subscription: Subscription;

  constructor(private productService: ProductService) {
    this.products = new Array<Product>();
    this.subscription = new Subscription();
  }

  ngOnInit(): void {
    this.loadData();
    this.subscription = this.productService.latestProducts.subscribe(() => {
      this.loadData();
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  private loadData() {
    let ids = new Array<string>();
    if (localStorage.getItem("latest") !== null) {
      ids = JSON.parse(localStorage.getItem("latest") ?? "");
      this.productService.getProductsById(ids).subscribe(observable => {
        this.products = new Array<Product>();
        ids.forEach(item => {
          this.products.push(observable.find(r => r.id === item) ?? new Product());
        });
      });
    }
  }
}
