import { z } from 'zod';

const productCreateSchema = z.object({
  body: z.object({
    name: z.string({ required_error: 'Name is required' }),
    description: z.string({ required_error: 'Description is required' }),
    category: z.string({ required_error: 'Category is required' }),
    brand: z.string({ required_error: 'Brand is required' }),
    stock: z
      .number({ required_error: 'Stock is required' })
      .int()
      .nonnegative({ message: 'Stock must be a non-negative integer' }),
    price: z
      .number({ required_error: 'Price is required' })
      .nonnegative({ message: 'Price must be a non-negative number' }),
    image: z
      .string({ required_error: 'Image is required' })
      .url({ message: 'Image must be a valid URL' }),
  }),
});

const productUpdateSchema = z.object({
  body: z.object({
    name: z.string().optional(),
    description: z.string().optional(),
    category: z.string().optional(),
    brand: z.string().optional(),
    stock: z
      .number()
      .int()
      .nonnegative({ message: 'Stock must be a non-negative integer' })
      .optional(),
    rating: z
      .number()
      .min(0, { message: 'Rating must be at least 0' })
      .max(5, { message: 'Rating cannot exceed 5' })
      .optional(),
    price: z
      .number()
      .nonnegative({ message: 'Price must be a non-negative number' })
      .optional(),
    image: z.string().url({ message: 'Image must be a valid URL' }).optional(),
  }),
});

const updateStock = z.object({
  body: z.object({
    products: z.array(
      z.object({
        quantity: z.number(),
        productId: z.string(),
      }),
    ),
  }),
});

export const ProductValidation = {
  productCreateSchema,
  updateStock,
  productUpdateSchema,
};
