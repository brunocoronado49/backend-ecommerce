import { Request, Response, Router } from 'express';

// App routes, here we going to encapsulate all routes
export class AppRoutes {
  public static get routes(): Router {
    // Initialize the Router to use for all the app
    const router: Router = Router();

    // Initial Route
    router.get('/api/v1', (req: Request, res: Response) => {
      res.json('Hello World');
    });

    return router;
  }
}
