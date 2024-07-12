export interface IProduct {
  name: string;
  description: string;
  category: string;
  brand: string;
  stock: number;
  rating: number;
  price: number;
  image: string;
}

export interface UpdateProductStockParams {
  productId: string;
  quantity: number;
}
