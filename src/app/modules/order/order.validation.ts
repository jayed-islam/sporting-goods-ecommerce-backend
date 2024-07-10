import { z } from 'zod';

const productInfoSchema = z.object({
  productId: z.string({ required_error: 'Product ID is required' }),
  quantity: z
    .number({ required_error: 'Quantity is required' })
    .min(1, { message: 'Quantity must be at least 1' }),
  name: z
    .string({ required_error: 'Name is required' })
    .min(5, { message: 'Name must be minimum 5 characters long' }),
});

const orderMakingValidation = z.object({
  body: z.object({
    name: z
      .string({ required_error: 'Name is required' })
      .min(2, { message: 'Name must be at least 2 characters long' }),
    phone: z
      .string({ required_error: 'Phone number is required' })
      .regex(/^\d{11}$/, {
        message: 'Phone number must be exactly 11 digits',
      }),
    district: z
      .string({ required_error: 'District name is required' })
      .min(2, { message: 'District name must be specified' }),
    division: z.string({ required_error: 'Division name is required' }),
    subDistrict: z
      .string({ required_error: 'Sub district name is required' })
      .min(2, { message: 'Sub-district name must be specified' }),
    detailAddress: z
      .string({ required_error: 'Detail Address is required' })
      .min(5, { message: 'Detail address must be at least 5 characters long' }),
    status: z
      .enum(['pending', 'confirmed', 'shipped', 'delivered', 'cancelled'])
      .default('pending'),
    products: z
      .array(productInfoSchema)
      .nonempty({ message: 'Products are required' }),
  }),
});

const orderStatusUpdateValidation = z.object({
  body: z.object({
    status: z.enum([
      'pending',
      'confirmed',
      'shipped',
      'delivered',
      'cancelled',
    ]),
  }),
});
export const OrderValidation = {
  orderMakingValidation,
  orderStatusUpdateValidation,
};
