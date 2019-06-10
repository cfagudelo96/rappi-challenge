import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { debounceTime, distinctUntilChanged, filter } from 'rxjs/operators';

import { Product, getPriceNumericValue } from '@rappi-prueba/products/shared/product';
import { ProductsService } from '@rappi-prueba/products/shared/products.service';

import { ShoppingCartItem } from '../shared/shopping-cart-item';

@Component({
  selector: 'brtn-shopping-cart-item-detail',
  templateUrl: './shopping-cart-item-detail.component.html',
  styleUrls: ['./shopping-cart-item-detail.component.scss']
})
export class ShoppingCartItemDetailComponent implements OnInit {
  @Input() shoppingCartItem: ShoppingCartItem;

  @Output() deleteShoppingCartItem: EventEmitter<ShoppingCartItem> = new EventEmitter<ShoppingCartItem>();

  @Output() editShoppingCartItem: EventEmitter<ShoppingCartItem> = new EventEmitter<ShoppingCartItem>();

  product: Product;

  quantityControl: FormControl;

  constructor(private productsService: ProductsService) {}

  ngOnInit() {
    this.productsService.getProduct(this.shoppingCartItem.productId).subscribe(product => {
      this.product = product;
      this.quantityControl = new FormControl(this.shoppingCartItem.quantity, [
        Validators.required,
        Validators.min(1),
        Validators.max(this.product.quantity)
      ]);
      this.listenToQuantityChanges();
    });
  }

  private listenToQuantityChanges() {
    this.quantityControl.valueChanges
      .pipe(
        debounceTime(300),
        distinctUntilChanged((v1, v2) => v1 === v2),
        filter(() => this.quantityControl.valid)
      )
      .subscribe(newQuantity => {
        this.editShoppingCartItem.emit({ quantity: newQuantity, productId: this.shoppingCartItem.productId });
      });
  }

  addUnit() {
    this.quantityControl.setValue(this.quantityControl.value + 1);
  }

  removeUnit() {
    this.quantityControl.setValue(this.quantityControl.value - 1);
  }

  onClickDelete() {
    this.deleteShoppingCartItem.emit(this.shoppingCartItem);
  }

  getTotalPrice(): number {
    return getPriceNumericValue(this.product) * this.shoppingCartItem.quantity;
  }
}
