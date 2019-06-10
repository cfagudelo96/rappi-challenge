import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShoppingCartItemDetailComponent } from './shopping-cart-item-detail.component';

describe('ShoppingCartItemDetailComponent', () => {
  let component: ShoppingCartItemDetailComponent;
  let fixture: ComponentFixture<ShoppingCartItemDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShoppingCartItemDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShoppingCartItemDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
