import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Product, ProductSortType, SortOrder } from '../models';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  latestProducts: Subject<void>;

  constructor(private httpClient: HttpClient) {
    this.latestProducts = new Subject<void>();

  }

  set setLatestViewed(ids: string) {
    localStorage.setItem("latest", ids);
    this.latestProducts.next();
  }

  // getProducts(providerName: string, productSortType: ProductSortType, sortOrder: SortOrder, searchText: string): Observable<Product[]> {
  //   return this.httpClient.get<Product[]>(environment.apiUrl).pipe(
  //     map(data => {
  //       if (providerName === '') {
  //         data = data.filter(s => s.providerName === providerName);
  //       }
  //       if (searchText !== '') {
  //         data = data.filter(s =>
  //           s.name.toLowerCase().includes(searchText.toLowerCase()) === true ||
  //           s.capacity.toString().includes(searchText) === true ||
  //           s.price.toString().includes(searchText) === true
  //         );
  //       }
  //       if (sortOrder === SortOrder.Ascending) {
  //         data = data.sort((a, b) => 0 - (this.sort(a, b, productSortType) ? -1 : 1));
  //       } else {
  //         data = data.sort((a, b) => 0 - (this.sort(a, b, productSortType) ? 1 : -1));
  //       }
  //       return data;
  //     })
  //   );
  // }

  getProviders(): Observable<string[]> {
    return this.httpClient.get<Product[]>(environment.apiUrl).pipe(
      map(data =>
        [...new Set(data.map(item => item.providerName))])
    );
  }

  // private sort(a: Product, b: Product, productSortType: ProductSortType): boolean {
  //   let result: boolean;
  //   switch (productSortType) {
  //     case ProductSortType.Capacity:
  //       result = a.capacity > b.capacity;
  //       break;
  //     case ProductSortType.Name:
  //       result = a.name > b.name;
  //       break;
  //     case ProductSortType.Price:
  //       result = a.price > b.price;
  //       break;
  //     default:
  //       result = a.id > b.id;
  //       break;
  //   }
  //   return result;
  // }

  getProducts(tag: string, providers: string[] = [], searchText = ""): Observable<Product[]> {
    return this.httpClient.get<Product[]>(environment.apiUrl).pipe(
      map(data => {
        if (tag !== "") {
          data = data.filter(s => s.tag === tag);
        }
        if (searchText !== "") {
          data = data.filter(s => s.title.toLowerCase().includes(searchText.toLowerCase()) === true);
        }
        if (providers !== null && providers.length > 0) {
          data = data.filter(s => providers.includes(s.providerName) === true);
        }
        return data;
      })
    );
  }

  getProductsById(ids: string[]): Observable<Product[]> {
    return this.httpClient.get<Product[]>(environment.apiUrl).pipe(
      map(data =>
        data.filter(s => ids.includes(s.id)))
    );
  }
}
