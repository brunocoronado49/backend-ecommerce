import { Router } from 'express';
import { ProductService } from './product.service';
import { ProductController } from './controller';
import { AuthMiddleware } from '../user/auth.middleware';

export class ProductRoutes {
  static get routes(): Router {
    const router: Router = Router();
    const productService: ProductService = new ProductService();
    const productController: ProductController = new ProductController(productService);

    router.use(AuthMiddleware.validateJWT);

    router.get('/', productController.getProducts);
    router.get('/:id', productController.getProductById);
    router.post('/', [AuthMiddleware.isSeller], productController.createProduct);
    router.put('/:id', [AuthMiddleware.isSeller], productController.updateProduct);
    router.delete('/:id', [AuthMiddleware.isSeller], productController.deleteProduct);

    return router;
  }
}
