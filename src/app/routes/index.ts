import { Router } from 'express';

import { ProductRoutes } from '../modules/product/product.routes';

const router = Router();

const modulesRoutes = [
  {
    path: '/product',
    route: ProductRoutes,
  },
];

modulesRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
