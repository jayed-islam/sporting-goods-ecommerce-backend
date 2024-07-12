/* eslint-disable @typescript-eslint/no-explicit-any */
import { IProduct, UpdateProductStockItem } from './product.interface';
import AppError from '../../errors/AppError';
import httpStatus from 'http-status';
import { Product } from './product.model';
import { SortOrder } from 'mongoose';

const createProductIntoDB = async (productData: IProduct) => {
  const existingProduct = await Product.findOne({ name: productData.name });

  if (existingProduct) {
    throw new AppError(
      httpStatus.CONFLICT,
      'A product with this name already exists',
    );
  }

  const product = await Product.create(productData);

  return product;
};

const getProductsByCategoryIntoDB = async (category: string) => {
  const products = await Product.find({ category }).limit(5);
  return products;
};

export const getProductsListInToDB = async (
  searchTerm: string,
  category: string,
  brand: string,
  rating: number,
  priceRange: number[],
  sort: 'asc' | 'desc' | undefined,
  page: number,
  limit: number,
) => {
  const query: Record<string, unknown> = {};

  if (category) {
    query.category = category;
  }

  if (searchTerm) {
    const searchRegex = new RegExp(searchTerm, 'i');
    query.name = searchRegex;
  }

  if (brand.length > 0) {
    query.brand = { $in: brand };
  }

  if (rating > 0) {
    query.rating = { $lte: rating };
  }

  if (priceRange.length === 2) {
    query.price = { $gte: priceRange[0], $lte: priceRange[1] };
  }

  let sortOption: string | Record<string, SortOrder> = {};

  if (sort) {
    sortOption = { price: sort === 'asc' ? 1 : -1 };
  } else {
    sortOption = { createdAt: -1 };
  }
  // const sortOption: { price: SortOrder } =
  //   sort === 'asc' ? { price: 1 } : { price: -1 };

  const countPromise = Product.countDocuments(query);

  const productsPromise = Product.find(query)
    .sort(sortOption)
    .skip((page - 1) * limit)
    .limit(limit);
  const [count, products] = await Promise.all([countPromise, productsPromise]);

  const totalPages = Math.ceil(count / limit);

  const pagination = {
    totalItems: count,
    totalPages: totalPages,
    currentPage: page,
    itemsPerPage: limit,
  };

  return { products, pagination };
};

const getSingleProductByIdInToDB = async (id: string) => {
  const product = await Product.findById(id);
  if (!product) {
    throw new AppError(httpStatus.NOT_FOUND, 'Product not found');
  }
  return product;
};

const updateSingleProduct = async (
  id: string,
  productData: Partial<IProduct>,
) => {
  const product = await Product.findByIdAndUpdate(id, productData, {
    new: true,
    runValidators: true,
  });
  return product;
};

const deleteProductFromDB = async (id: string) => {
  const product = await Product.findByIdAndDelete(id);
  return product;
};

const updateMultipleProductStocks = async (
  products: UpdateProductStockItem[],
) => {
  try {
    if (products.length === 0) {
      throw new AppError(
        httpStatus.NOT_FOUND,
        'Add one product in your cart for make order',
      );
    }
    const updatedProducts = await Promise.all(
      products.map(async (product) => {
        const { productId, quantity } = product;

        const productToUpdate = await Product.findById(productId);

        if (!productToUpdate) {
          throw new Error(`Product with ID ${productId} not found.`);
        }

        productToUpdate.stock -= quantity;

        await productToUpdate.save();

        return productToUpdate;
      }),
    );

    return updatedProducts;
  } catch (error: any) {
    throw new AppError(httpStatus.CONFLICT, error.message);
  }
};

export const ProductServices = {
  createProductIntoDB,
  getProductsByCategoryIntoDB,
  getSingleProductByIdInToDB,
  getProductsListInToDB,
  updateSingleProduct,
  deleteProductFromDB,
  updateMultipleProductStocks,
};
