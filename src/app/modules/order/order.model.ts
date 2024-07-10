import { Schema, model } from 'mongoose';
import { IOrder } from './order.interface';

const productInfoSchema = new Schema({
  productId: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
});

const orderSchema = new Schema<IOrder>(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
    },
    phone: {
      type: String,
      required: [true, 'Phone number is required'],
    },
    district: {
      type: String,
      required: [true, 'District is required'],
    },
    division: {
      type: String,
      default: null,
    },
    subDistrict: {
      type: String,
      required: [true, 'Sub-district is required'],
    },
    detailAddress: {
      type: String,
      required: [true, 'Detail address is required'],
    },
    totalAmount: {
      type: Number,
      required: [true, 'Total amount is required'],
    },
    status: {
      type: String,
      enum: ['pending', 'confirmed', 'shipped', 'delivered', 'cancelled'],
      default: 'pending',
    },
    products: {
      type: [productInfoSchema],
      required: [true, 'Products info are required'],
    },
  },
  {
    timestamps: true,
  },
);

const Order = model<IOrder>('Order', orderSchema);

export default Order;
