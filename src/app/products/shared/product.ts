export interface Product {
  quantity: number;
  price: string;
  available: boolean;
  sublevelId: number;
  name: string;
  id: string;
}

export interface ProductsFilter {
  priceFrom?: number;
  priceTo?: number;
  quantityFrom?: number;
  quantityTo?: number;
  onlyAvailable?: boolean;
}

export function getPriceNumericValue(product: Product): number {
  return +product.price.replace(/\D/g, '');
}
