import { Component, Input } from '@angular/core';
import { Observable } from 'rxjs';

import { Product } from '../shared/product';

@Component({
  selector: 'brtn-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.scss']
})
export class ProductsListComponent {
  @Input() products$: Observable<Product[]>;

  constructor() {}
}
