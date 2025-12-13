export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  available: boolean;
  category: string;
  bestseller: boolean;
  outOfStock?: boolean;
  showWhenOutOfStock?: boolean;
}

export interface ProductData {
  products: Product[];
}