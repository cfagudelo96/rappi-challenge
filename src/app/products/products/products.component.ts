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
import { FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'brtn-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  @ViewChild(MatSidenav, { static: true }) sidenav: MatSidenav;

  productSearchControl: FormControl;

  isMobile = false;

  readonly toolbarMargin = 56;

  products$: Observable<Product[]>;

  currentSort: Sort;

  currentCategory: Category;

  currentProductsFilter: ProductsFilter = {};

  currentSearchValue = '';

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
    this.initializeProductSearchControl();
  }

  private initializeProductSearchControl() {
    this.productSearchControl = new FormControl('');
    this.productSearchControl.valueChanges
      .pipe(
        debounceTime(300),
        distinctUntilChanged((v1, v2) => v1 === v2)
      )
      .subscribe(searchValue => {
        this.currentSearchValue = searchValue;
        this.loadProducts();
      });
  }

  ngOnInit() {
    this.loadProducts();
  }

  loadProducts() {
    this.products$ = this.productsService.getProducts(
      this.currentCategory ? this.currentCategory.id : undefined,
      this.currentSort,
      this.currentProductsFilter,
      this.currentSearchValue
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

  leafCategorySelected() {
    return (
      this.currentCategory &&
      this.currentCategory.id &&
      (!this.currentCategory.sublevels || this.currentCategory.sublevels.length === 0)
    );
  }
}
