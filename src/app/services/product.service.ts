import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Product } from '../models';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  latestProducts: Subject<void>;

  constructor(private httpClient: HttpClient) {
    this.latestProducts = new Subject<void>();

  }

  set setLatestViewed(ids: string) {
    localStorage.setItem('latest', ids);
    this.latestProducts.next();
  }

  getProviders(): Observable<string[]> {
    return this.httpClient.get<Product[]>(environment.apiUrl).pipe(
      map(data =>
        [...new Set(data.map(item => item.providerName))])
    );
  }

  getProducts(tag: string, providers: string[] = [], searchText = ''): Observable<Product[]> {
    return this.httpClient.get<Product[]>(environment.apiUrl).pipe(
      map(data => {
        if (tag !== '') {
          data = data.filter(s => s.tag === tag);
        }
        if (searchText !== '') {
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
