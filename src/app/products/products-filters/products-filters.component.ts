import { Component, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, ValidationErrors } from '@angular/forms';

import { ProductsFilter } from '../shared/product';

@Component({
  selector: 'brtn-products-filters',
  templateUrl: './products-filters.component.html',
  styleUrls: ['./products-filters.component.scss']
})
export class ProductsFiltersComponent {
  @Output() filterProducts: EventEmitter<ProductsFilter> = new EventEmitter();

  filtersForm: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.filtersForm = this.formBuilder.group(
      {
        priceFrom: [null],
        priceTo: [null],
        quantityFrom: [null],
        quantityTo: [null],
        onlyAvailable: [false]
      },
      { validators: [this.priceRangeValidation, this.quantityRangeValidation] }
    );
  }

  submitFiltersForm() {
    this.filterProducts.emit(this.filtersForm.value);
  }

  showAllProducts() {
    this.filtersForm.reset();
    this.submitFiltersForm();
  }

  priceRangeValidation(control: FormGroup): ValidationErrors | null {
    const priceFromControl = control.get('priceFrom');
    const priceFrom = control.get('priceFrom').value;
    const priceTo = control.get('priceTo').value;
    if (priceFrom && priceTo && priceTo < priceFrom) {
      const error = { invalidPriceRange: true };
      priceFromControl.setErrors(error);
      return error;
    } else {
      priceFromControl.setErrors(null);
      return null;
    }
  }

  quantityRangeValidation(control: FormGroup): ValidationErrors | null {
    const quantityFromControl = control.get('quantityFrom');
    const quantityFrom = control.get('quantityFrom').value;
    const quantityTo = control.get('quantityTo').value;
    if (quantityFrom && quantityTo && quantityTo < quantityFrom) {
      const error = { invalidQuantityRange: true };
      quantityFromControl.setErrors(error);
      return error;
    } else {
      quantityFromControl.setErrors(null);
      return null;
    }
  }
}
