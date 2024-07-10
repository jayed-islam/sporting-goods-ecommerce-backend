import { Types } from 'mongoose';

export interface IOrder {
  name: string;
  phone: string;
  district: string;
  division: string;
  subDistrict: string;
  detailAddress: string;
  totalAmount: number;
  status: 'pending' | 'confirmed' | 'shipped' | 'delivered' | 'cancelled';
  products: ProductInfo[];
}

interface ProductInfo {
  name: string;
  productId: string;
  quantity: number;
}

export interface IBookingRental {
  bikeId: Types.ObjectId;
  startTime: Date;
}

export interface IOrderQuery {
  search: string;
  order: string;
  page: number;
  limit: number;
  status: string;
}

export interface OrderFilter {
  status?: string;
  $or?: Array<
    | { name: { $regex: string; $options: string } }
    | { phone: { $regex: string; $options: string } }
  >;
}
