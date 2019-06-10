import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductsSortingComponent } from './products-sorting.component';

describe('ProductsSortingComponent', () => {
  let component: ProductsSortingComponent;
  let fixture: ComponentFixture<ProductsSortingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductsSortingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductsSortingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
