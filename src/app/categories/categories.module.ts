import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

import { CategoriesMenuComponent } from './categories-menu/categories-menu.component';
import { CategoriesMenuItemComponent } from './categories-menu-item/categories-menu-item.component';

@NgModule({
  declarations: [CategoriesMenuComponent, CategoriesMenuItemComponent],
  imports: [CommonModule, MatMenuModule, MatIconModule, MatButtonModule],
  exports: [CategoriesMenuComponent]
})
export class CategoriesModule {}
