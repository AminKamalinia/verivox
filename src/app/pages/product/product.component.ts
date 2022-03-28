import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/models';
import { ProductService } from 'src/app/services';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {

  id: string;
  product: Product;

  constructor(
    private activatedRoute: ActivatedRoute,
    private productService: ProductService
  ) {
    this.id = "";
    this.product = new Product();
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(param => {
      if (param['id'] !== null && param['id'] !== undefined) {
        this.id = param['id'];
        this.loadData();
        this.updateLatestVisitedList();
      }
    });
  }

  private loadData(): void {
    this.productService.getProducts("").subscribe(observer => {
      this.product = observer.find(s => s.id === this.id) ?? new Product();
    });
  }

  private updateLatestVisitedList(): void {
    let ids = new Array<string>();
    if (localStorage.getItem("latest") !== null) {
      ids = JSON.parse(localStorage.getItem("latest") ?? "");
    }
    if (ids.length === 0) {
      ids.push(this.id);
    } else {
      if (ids.some(r => r === this.id) === true) {
        ids = ids.filter(r => r !== this.id);
      }
      ids.unshift(this.id);
      if (ids.length > 5) {
        ids.pop();
      }
    }
    this.productService.setLatestViewed = JSON.stringify(ids);
  }
}
