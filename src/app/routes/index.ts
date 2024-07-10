import { Router } from 'express';
import { OrderRoutes } from '../modules/order/order.routes';

const router = Router();

const modulesRoutes = [
  {
    path: '/order',
    route: OrderRoutes,
  },
];

modulesRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
