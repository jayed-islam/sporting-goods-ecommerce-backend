import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import httpStatus from 'http-status';
import { ProductServices } from './product.service';

const createProduct = catchAsync(async (req, res) => {
  const productData = req.body;
  const product = await ProductServices.createProductIntoDB(productData);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Product Created Successfully!',
    data: product,
  });
});

const getProductList = catchAsync(async (req, res) => {
  const {
    page = 1,
    limit = 10,
    search = '',
    category = '',
    sort,
    brand = [],
    rating = 0,
    priceRange = [0, 1000],
  } = req.body;

  const { products, pagination } = await ProductServices.getProductsListInToDB(
    search,
    category,
    brand,
    rating,
    priceRange,
    sort,
    Number(page),
    Number(limit),
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Products retitrived Successfully!',
    data: {
      products,
      pagination,
    },
  });
});

const getSingleProductByID = catchAsync(async (req, res) => {
  const { productId } = req.params;
  const product = await ProductServices.getSingleProductByIdInToDB(productId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Product data rectrived Successfully!',
    data: product,
  });
});

const getProductByCategory = catchAsync(async (req, res) => {
  const { category } = req.params;
  const product = await ProductServices.getProductsByCategoryIntoDB(category);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Product data rectrived Successfully!',
    data: product,
  });
});

const updateSingleProduct = catchAsync(async (req, res) => {
  const { id } = req.params;
  const { product } = req.body;
  const result = await ProductServices.updateSingleProduct(id, product);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Product data updated Successfully!',
    data: result,
  });
});

const deleteProduct = catchAsync(async (req, res) => {
  const { id } = req.params;
  const product = await ProductServices.deleteProductFromDB(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Product deleted Successfully!',
    data: product,
  });
});

const updateProductStock = catchAsync(async (req, res) => {
  const { products } = req.body;

  const updatedProducts =
    await ProductServices.updateMultipleProductStocks(products);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Product stocks updated successfully!',
    data: updatedProducts,
  });
});

export const ProductController = {
  createProduct,
  getProductList,
  getSingleProductByID,
  updateSingleProduct,
  deleteProduct,
  getProductByCategory,
  updateProductStock,
};
