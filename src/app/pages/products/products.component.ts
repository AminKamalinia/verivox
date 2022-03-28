import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { debounceTime, Subject, Subscription } from 'rxjs';
import { Product } from 'src/app/models';
import { ProductService } from 'src/app/services';
import { Location } from '@angular/common';


@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  searchText: string;
  products: Product[];
  providers: string[];
  selectedProviders: string[];
  private userQuestionUpdate: Subject<void>;
  private subscription: Subscription;

  constructor(
    private location: Location,
    private activatedRoute: ActivatedRoute,
    private productService: ProductService) {
    this.searchText = '';
    this.products = new Array<Product>();
    this.providers = new Array<string>();
    this.selectedProviders = new Array<string>();
    this.userQuestionUpdate = new Subject<void>();
    this.subscription = new Subscription();
  }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(queryParams => {
      if (queryParams['searchTerm'] !== undefined &&
        queryParams['searchTerm'] !== '') {
        this.searchText = queryParams['searchTerm'];
      }
      if (queryParams['provider'] !== undefined &&
        queryParams['provider'] !== '') {
        const temp: string = queryParams['provider'];
        this.selectedProviders = temp.split(',');
      }
    });

    this.loadDataa();

    this.subscription = this.userQuestionUpdate.pipe(
      debounceTime(500))
      .subscribe(() => {
        this.loadDataa();
      });
  }

  editSearchText(): void {
    let queryString = '';
    if (this.searchText !== '' && this.selectedProviders.length === 0) {
      queryString = 'searchTerm=' + this.searchText;
    } else if (this.searchText === '' && this.selectedProviders.length > 0) {
      queryString = 'provider=' + this.selectedProviders.toString();
    } else if (this.searchText !== '' && this.selectedProviders.length > 0) {
      queryString = `searchTerm=${this.searchText}&provider=${this.selectedProviders.toString()}`;
    }
    this.location.replaceState("pages/products", queryString);
    this.userQuestionUpdate.next();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  private loadDataa(): void {
    this.productService.getProducts('', this.selectedProviders, this.searchText).subscribe(observer => {
      this.products = observer;
      this.providers = [...new Set(this.products.map(item => item.providerName))];
    });
  }
}
