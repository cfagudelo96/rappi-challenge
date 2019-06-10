import { Component, OnInit, ViewChild } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Sort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { MatSidenav } from '@angular/material/sidenav';
import { Observable } from 'rxjs';

import { Category } from '@rappi-prueba/categories/shared/category';
import { ShoppingCartService } from '@rappi-prueba/shopping-cart/shared/shopping-cart.service';
import { ShoppingCartComponent } from '@rappi-prueba/shopping-cart/shopping-cart/shopping-cart.component';

import { Product, ProductsFilter } from '../shared/product';
import { ProductsService } from '../shared/products.service';

@Component({
  selector: 'brtn-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  @ViewChild(MatSidenav, { static: true }) sidenav: MatSidenav;

  isMobile = false;

  readonly toolbarMargin = 56;

  products$: Observable<Product[]>;

  currentSort: Sort;

  currentCategory: Category;

  currentProductsFilter: ProductsFilter = {};

  constructor(
    private breakpointObserver: BreakpointObserver,
    private dialog: MatDialog,
    private productsService: ProductsService,
    private shoppingCartService: ShoppingCartService
  ) {
    this.breakpointObserver.observe([Breakpoints.HandsetLandscape, Breakpoints.HandsetPortrait]).subscribe(result => {
      this.isMobile = result.matches;
      this.sidenav.opened = !result.matches;
    });
  }

  ngOnInit() {
    this.loadProducts();
  }

  loadProducts() {
    this.products$ = this.productsService.getProducts(
      this.currentCategory ? this.currentCategory.id : undefined,
      this.currentSort,
      this.currentProductsFilter
    );
  }

  onFilterProducts(productsFilter: ProductsFilter) {
    this.currentProductsFilter = productsFilter;
    this.loadProducts();
  }

  onSortProducts(sort: Sort) {
    this.currentSort = sort;
    this.loadProducts();
  }

  onCategorySelected(category: Category) {
    this.currentCategory = category;
    this.loadProducts();
  }

  openShoppingCart() {
    this.dialog.open(ShoppingCartComponent);
  }

  getNumberOfProductsInShoppingCart() {
    return this.shoppingCartService.getNumberOfProducts();
  }
}
