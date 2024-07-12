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

export interface UpdateProductStockItem {
  productId: string;
  quantity: number;
}
