import { Component, Output, EventEmitter } from '@angular/core';
import { Sort } from '@angular/material/sort';

@Component({
  selector: 'brtn-products-sorting',
  templateUrl: './products-sorting.component.html',
  styleUrls: ['./products-sorting.component.scss']
})
export class ProductsSortingComponent {
  @Output() sortProducts: EventEmitter<Sort> = new EventEmitter();

  constructor() {}

  onMatSortChange(sort: Sort) {
    this.sortProducts.emit(sort);
  }
}
