import { Component, Input, ViewChild, Output, EventEmitter } from '@angular/core';
import { MatMenu } from '@angular/material/menu';

import { Category } from '../shared/category';

@Component({
  selector: 'brtn-categories-menu-item',
  templateUrl: './categories-menu-item.component.html',
  styleUrls: ['./categories-menu-item.component.scss']
})
export class CategoriesMenuItemComponent {
  @Input() categories: Category[];

  @Output() categorySelected: EventEmitter<Category> = new EventEmitter<Category>();

  @ViewChild('childMenu', { static: true }) childMenu: MatMenu;

  constructor() {}

  onCategorySelected(category: Category) {
    this.categorySelected.emit(category);
  }
}
