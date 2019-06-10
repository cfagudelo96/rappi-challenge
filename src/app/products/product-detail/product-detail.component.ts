import { Component, OnInit, Input } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

import { ShoppingCartService } from '@rappi-prueba/shopping-cart/shared/shopping-cart.service';

import { Product } from '../shared/product';

@Component({
  selector: 'brtn-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {
  @Input() product: Product;

  quantityControl: FormControl;

  constructor(private snackBar: MatSnackBar, private shoppingCartService: ShoppingCartService) {}

  ngOnInit() {
    this.quantityControl = new FormControl(1, [
      Validators.required,
      Validators.min(1),
      Validators.max(this.product.quantity)
    ]);
  }

  addUnit() {
    this.quantityControl.setValue(this.quantityControl.value + 1);
  }

  removeUnit() {
    this.quantityControl.setValue(this.quantityControl.value - 1);
  }

  addToShoppingCart() {
    this.shoppingCartService.upsertProduct(this.product.id, this.quantityControl.value);
    this.snackBar.open(
      `Se añadieron ${this.quantityControl.value} unidad(es) de ${this.product.name} a tu carrito de compras`,
      undefined,
      { duration: 2000 }
    );
    this.quantityControl.reset(1);
  }
}
