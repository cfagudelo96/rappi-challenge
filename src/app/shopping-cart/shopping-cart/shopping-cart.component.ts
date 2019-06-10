import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';

import { ShoppingCartService } from '../shared/shopping-cart.service';
import { ShoppingCartItem } from '../shared/shopping-cart-item';

@Component({
  selector: 'brtn-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.scss']
})
export class ShoppingCartComponent implements OnInit {
  shoppingCartItems: ShoppingCartItem[] = [];

  price$: Observable<number>;

  constructor(
    private shoppingCartService: ShoppingCartService,
    private snackBar: MatSnackBar,
    private dialogRef: MatDialogRef<ShoppingCartComponent>
  ) {}

  ngOnInit() {
    this.shoppingCartService.getShoppingCart().subscribe(shoppingCartItems => {
      this.shoppingCartItems = shoppingCartItems;
    });
    this.price$ = this.shoppingCartService.getShoppingCartPrice();
  }

  itemsPresent() {
    return this.shoppingCartItems.length !== 0;
  }

  buy() {
    this.dialogRef.close();
    this.snackBar.open(`¡Gracias por tu compra!`, undefined, { duration: 2000 });
    this.shoppingCartService.buy();
  }

  onDeleteShoppingCartItem(shoppingCartItem: ShoppingCartItem) {
    this.shoppingCartService.removeProduct(shoppingCartItem.productId);
  }

  onEditShoppingCartItem(shoppingCartItem: ShoppingCartItem) {
    this.shoppingCartService.updateProduct(shoppingCartItem.productId, shoppingCartItem.quantity);
  }
}
