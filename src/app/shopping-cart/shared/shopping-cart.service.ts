import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, forkJoin } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

import { ProductsService } from '@rappi-prueba/products/shared/products.service';
import { Product, getPriceNumericValue } from '@rappi-prueba/products/shared/product';

import { ShoppingCartItem } from './shopping-cart-item';

interface ShoppingCartMap {
  [productId: string]: number;
}

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {
  private shoppingCart: BehaviorSubject<ShoppingCartMap> = new BehaviorSubject({});

  constructor(private productsService: ProductsService) {
    let shoppingCart = JSON.parse(localStorage.getItem('shoppingCart'));
    shoppingCart = shoppingCart ? shoppingCart : {};
    this.shoppingCart.next(shoppingCart);
  }

  getShoppingCart(): Observable<ShoppingCartItem[]> {
    return this.shoppingCart.asObservable().pipe(
      map(shoppingCart => {
        const productIds: string[] = Object.keys(shoppingCart);
        return productIds.map(productId => {
          return { productId, quantity: shoppingCart[productId] };
        });
      })
    );
  }

  getShoppingCartProducts(): Observable<Product[]> {
    return this.shoppingCart.asObservable().pipe(
      map(shoppingCart => {
        const productIds: string[] = Object.keys(shoppingCart);
        return productIds;
      }),
      switchMap(productIds => {
        const productObservables: Observable<Product>[] = productIds.map(productId =>
          this.productsService.getProduct(productId)
        );
        return forkJoin(productObservables);
      })
    );
  }

  getShoppingCartPrice(): Observable<number> {
    return this.getShoppingCartProducts().pipe(
      map(products => {
        const shoppingCart = this.shoppingCart.value;
        let price = 0;
        products.forEach(product => {
          price += getPriceNumericValue(product) * shoppingCart[product.id];
        });
        return price;
      })
    );
  }

  getNumberOfProducts(): Observable<number> {
    return this.shoppingCart.asObservable().pipe(
      map(shoppingCart => {
        return Object.keys(shoppingCart).length;
      })
    );
  }

  upsertProduct(productId: string, quantity: number) {
    const shoppingCart = this.shoppingCart.value;
    shoppingCart[productId] = shoppingCart[productId] ? shoppingCart[productId] + quantity : quantity;
    this.shoppingCart.next(shoppingCart);
    this.saveShoppingCartLocalStorage();
  }

  updateProduct(productId: string, quantity: number) {
    const shoppingCart = this.shoppingCart.value;
    shoppingCart[productId] = quantity;
    this.shoppingCart.next(shoppingCart);
    this.saveShoppingCartLocalStorage();
  }

  removeProduct(productId: string) {
    const shoppingCart = this.shoppingCart.value;
    delete shoppingCart[productId];
    this.shoppingCart.next(shoppingCart);
    this.saveShoppingCartLocalStorage();
  }

  buy() {
    this.shoppingCart.next({});
    this.saveShoppingCartLocalStorage();
  }

  private saveShoppingCartLocalStorage() {
    localStorage.setItem('shoppingCart', JSON.stringify(this.shoppingCart.value));
  }
}
