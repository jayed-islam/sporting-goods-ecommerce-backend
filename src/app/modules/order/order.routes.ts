import express from 'express';
import validateRequest from '../../middlewares/validateRequest';

import auth from '../../middlewares/auth';
import { USER_ROLE } from '../user/user.constants';
import { OrderController } from './order.controller';
import { OrderValidation } from './order.validation';

const router = express.Router();

// create rental
router.post(
  '/',
  validateRequest(OrderValidation.orderMakingValidation),
  OrderController.createOrder,
);

router.patch(
  '/status/:orderId',
  auth(USER_ROLE.admin),
  validateRequest(OrderValidation.orderStatusUpdateValidation),
  OrderController.updateOrderStatus,
);

router.get('/get-all', auth(USER_ROLE.admin), OrderController.getAllOrder);

router.get(
  '/status-counts',
  auth(USER_ROLE.admin),
  OrderController.getStatusCounts,
);

export const OrderRoutes = router;
