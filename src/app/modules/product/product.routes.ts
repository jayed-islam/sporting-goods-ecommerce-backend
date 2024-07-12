import { ProductController } from './product.controller';
import validateRequest from '../../middlewares/validateRequest';
import { Router } from 'express';
import { ProductValidation } from './product.validation';

const router = Router();

router.post(
  '/',
  validateRequest(ProductValidation.productCreateSchema),
  ProductController.createProduct,
);

router.post('/get-list', ProductController.getProductList);

router.put(
  '/update-stock',
  validateRequest(ProductValidation.updateStock),
  ProductController.updateProductStock,
);

router.get('/get-single/:productId', ProductController.getSingleProductByID);
router.get('/category/:category', ProductController.getProductByCategory);
router.put(
  '/:id',
  validateRequest(ProductValidation.productUpdateSchema),
  ProductController.updateSingleProduct,
);
router.delete('/:id', ProductController.deleteProduct);

export const ProductRoutes = router;
