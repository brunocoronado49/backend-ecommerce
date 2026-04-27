import { Router } from 'express';
import { UserRoutes } from './user/routes';
import { CategoryRoutes } from './category/routes';
import { ProductRoutes } from './product/routes';

// App routes, here we going to encapsulate all routes
export class AppRoutes {
  public static get routes(): Router {
    // Initialize the Router to use for all the app
    const router: Router = Router();

    // Initial Route
    router.use('/api/auth', UserRoutes.routes);
    router.use('/api/categories', CategoryRoutes.routes);
    router.use('/api/products', ProductRoutes.routes);

    return router;
  }
}
