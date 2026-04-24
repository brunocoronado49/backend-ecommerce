import { Router } from 'express';
import { CategoryService } from './category.service';
import { CategoryController } from './controller';
import { AuthMiddleware } from '../user/auth.middleware';

export class CategoryRoutes {
  static get routes(): Router {
    const router: Router = Router();
    const categoryService: CategoryService = new CategoryService();
    const categoryController: CategoryController = new CategoryController(categoryService);

    router.use(AuthMiddleware.validateJWT);

    router.get('/', categoryController.getCategories);
    router.post('/', categoryController.createCategory);
    router.get('/:id', categoryController.getCategoryById);
    router.put('/:id', categoryController.updateCategory);
    router.delete('/:id', categoryController.deleteCategory);

    return router;
  }
}
