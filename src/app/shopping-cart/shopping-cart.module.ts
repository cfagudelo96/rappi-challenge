import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';

import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { ShoppingCartItemDetailComponent } from './shopping-cart-item-detail/shopping-cart-item-detail.component';

@NgModule({
  declarations: [ShoppingCartComponent, ShoppingCartItemDetailComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    MatDialogModule,
    MatIconModule,
    MatInputModule,
    MatButtonModule
  ],
  exports: [ShoppingCartComponent],
  entryComponents: [ShoppingCartComponent]
})
export class ShoppingCartModule {}
