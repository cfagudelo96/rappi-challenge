import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Sort } from '@angular/material/sort';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

import { Product, ProductsFilter, getPriceNumericValue } from './product';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  constructor(private httpClient: HttpClient) {}

  getProduct(productId: string): Observable<Product> {
    return this.httpClient.get<{ products: Product[] }>('./assets/data/products.json').pipe(
      map(response => {
        return response.products.find(product => product.id === productId);
      })
    );
  }

  getProducts(categoryId?: number, sort?: Sort, productsFilter: ProductsFilter = {}): Observable<Product[]> {
    return this.httpClient.get<{ products: Product[] }>('./assets/data/products.json').pipe(
      map(response => {
        let products = this.mapProductsToCamelCase(response.products);
        products = this.filterProductsByCategoryId(products, categoryId);
        products = this.filterProducts(products, productsFilter);
        products = this.sortProducts(products, sort);
        return products;
      }),
      catchError(() => of([]))
    );
  }

  private mapProductsToCamelCase(products: Product[]): Product[] {
    return products.map((productResponse: any) => {
      productResponse.sublevelId = productResponse.sublevel_id;
      delete productResponse.sublevel_id;
      return productResponse;
    });
  }

  private filterProductsByCategoryId(products: Product[], categoryId: number): Product[] {
    if (categoryId) {
      return products.filter(product => product.sublevelId === categoryId);
    }
    return products;
  }

  private filterProducts(products: Product[], productsFilter: ProductsFilter) {
    if (productsFilter.onlyAvailable) {
      products = products.filter(product => product.available);
    }
    if (productsFilter.priceFrom) {
      products = products.filter(product => getPriceNumericValue(product) >= productsFilter.priceFrom);
    }
    if (productsFilter.priceTo) {
      products = products.filter(product => getPriceNumericValue(product) <= productsFilter.priceTo);
    }
    if (productsFilter.quantityFrom) {
      products = products.filter(product => product.quantity >= productsFilter.quantityFrom);
    }
    if (productsFilter.quantityTo) {
      products = products.filter(product => product.quantity <= productsFilter.quantityTo);
    }
    return products;
  }

  private sortProducts(products: Product[], sort: Sort) {
    if (sort && sort.direction) {
      return products.sort((product1, product2) => {
        const directionMultiplier = sort.direction === 'asc' ? 1 : -1;
        return (
          directionMultiplier *
          (this.getProductSortableValue(product1, sort.active) - this.getProductSortableValue(product2, sort.active))
        );
      });
    }
    return products;
  }

  private getProductSortableValue(product: Product, sortingAttribute: string): number {
    if (sortingAttribute === 'available') {
      return product[sortingAttribute] ? 1 : 0;
    } else if (sortingAttribute === 'price') {
      return getPriceNumericValue(product);
    } else {
      return product[sortingAttribute];
    }
  }
}
