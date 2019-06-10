import { Component, OnInit, Output, EventEmitter } from '@angular/core';

import { Category } from '../shared/category';
import { CategoriesService } from '../shared/categories.service';

@Component({
  selector: 'brtn-categories-menu',
  templateUrl: './categories-menu.component.html',
  styleUrls: ['./categories-menu.component.scss']
})
export class CategoriesMenuComponent implements OnInit {
  @Output() categorySelected: EventEmitter<Category> = new EventEmitter<Category>();

  categories: Category[] = [];

  constructor(private categoriesService: CategoriesService) {}

  ngOnInit() {
    this.categoriesService.getCategories().subscribe(categories => {
      this.categories = [{ id: undefined, name: 'Todos los productos', sublevels: [] }, ...categories];
    });
  }

  onCategorySelected(category: Category) {
    this.categorySelected.emit(category);
  }
}
