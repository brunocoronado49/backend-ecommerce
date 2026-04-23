import { Request, Response, Router } from 'express';
import { UserRoutes } from './user/routes';

// App routes, here we going to encapsulate all routes
export class AppRoutes {
  public static get routes(): Router {
    // Initialize the Router to use for all the app
    const router: Router = Router();

    // Initial Route
    router.use('/api/auth', UserRoutes.routes);

    return router;
  }
}
